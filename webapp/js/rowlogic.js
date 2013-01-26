// bind the functions
var init = init;
var makeRows = makeRowFn;
var error = errorFn; //
var print = printFn; // POST to web interface.
var del = delRow;

var FORGEDATA = true;
var fakeData = '[{"path":"cover.jpg","is_dir":false,"mime_type":"image/jpeg"},{"path":"hw1 solutions.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw1.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw2 solutions.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw2.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw3.pdf","is_dir":false,"mime_type":"application/pdf"}]';


var model = {
    "andrewId":null,
    "printingEnabled":false,
    "rows": []
};
// Fields a row will have
var modelRow = {
    "rowId":null,
    "path":null,
    "mime_type":null,

    "sureToDelete":false

}
// Initialize the page.
function init() {
    // Populate the model
    $.ajaxSetup ({
     cache: false
     });
    $.ajax({
        type: "GET",
        url: "http://printbox.servebeer.com:9000/",
        async: false,
        /*beforeSend: function(x) {
            if(x &amp;&amp; x.overrideMimeType) {
                x.overrideMimeType("application/j-son;charset=UTF-8");
            }
        },*/
        dataType: "json",
        success: nextFn
    });

    if(FORGEDATA == true) {
        nextFn(fakeData);
    }

    return model;
}

function nextFn(jsonString) {
    // Populate model
    populateModel(jsonString);

    // Add rows
    makeRows(model["rows"]);
}


function populateModel(jsonString) {
    console.log("populate!");
    var fileArray = JSON.parse(jsonString);
    console.log(fileArray);
    for(var i = 0; i < fileArray.length; i++) {
        addRowToModel(fileArray[i], i);
    }
    console.log("complete!");
    console.log(model["rows"]);
}

// Takes a file, adds it to the model
// {"path":"cover.jpg","is_dir":false,"mime_type":"image/jpeg"}
function addRowToModel(fileElem, rowId) {
    var newRow = {};
    newRow["rowId"]=rowId;
    newRow["path"]=fileElem["path"];
    newRow["mime_type"]=fileElem["mime_type"];
    newRow["sureToDelete"]=false;
    model["rows"].push(newRow);
}

function makeRowFn(myDocs){
    if (myDocs.length > 0){
        $("#empty").hide();
    }
    for (var i=0; i<myDocs.length; i++){
      var ftype = "unknown";
      if (myDocs[i].mime_type === "application/msword" || myDocs[i].mime_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
          ftype = "msftword";
      }
      else if (myDocs[i].mime_type === "text/plain"){
          ftype = "text";
      }
      else if (myDocs[i].mime_type.substring(0,6) === "image/"){
          ftype = "image";
      }
      else if (myDocs[i].mime_type === "application/pdf" || myDocs[i].mime_type === "application/x-pdf"){
          ftype = "pdf";
      }
      else if (myDocs[i].mime_type === "application/vnd.ms-powerpoint" || myDocs[i].mime_type === "pplication/vnd.openxmlformats-officedocument.presentationml.presentation"){
          ftype = "msftppt";
      }
      document.write("<li id='row" + i.toString() +
                     "'><a href='#'>" + 
                     "<div class='tblrow'><img class='file-thumbnail' src='icons/" + ftype +
                     ".jpg'><h5>" + myDocs[i].path + 
                     "</h5><button class='print btn btn-success' type='button' onclick='print(\"" +
                     i.toString() + "\")'>Print</button>" +
                     "<button class='delete btn btn-danger' type='button' onclick='del(\"" +
                     i.toString() + "\")'>Delete</button></div></a></li>");
    };
    return;
}

function errorFn(){
  document.write("<li>Super Sad Faces Everywhere</li>");
  return;
}


function printFn(rowId){
    var printButton = $("#row"+rowId+" a .tblrow button.print");
    printButton.hide();
    printButton.text("Print Again");
    printButton.addClass("btn-primary").removeClass("btn-success");
    printButton.fadeIn("slow");
    //var whatwewant = search
    if ($(".tblrow").length <= 0) {
        $("#empty").show();
    }
    //document.getElementById(objId).style.display = 'none'; 
    return;
}

function delRow(rowId){
    // When displaying "are you sure", add sure class, which you will
    //  then check for when you delete.
    var delButton = $("#row"+rowId+" a .tblrow button.delete");
    var delRow = $("#row"+rowId)

    if($("#row"+rowId+" a .tblrow button.sure").length == 1) {
        delRow.slideUp("slow", null);
    } else {
        delButton.hide();
        delButton.text("Are you sure?");
        delButton.addClass("btn-warning sure").removeClass("btn-danger");
        delButton.fadeIn("slow");
    }
    //printButton.fadeIn("slow");



    if ($(".tblrow").length <= 0) {
        $("#empty").show();
    }
    //document.getElementById(objId).style.display = 'none'; 
    return;
}