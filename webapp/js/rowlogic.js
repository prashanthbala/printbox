
// bind the functions
var init = init;
var makeRows = makeRowFn;
var error = errorFn; //


var FORGEDATA = false;
var fakeData = '[{"path":"cover.jpg","is_dir":false,"mime_type":"image/jpeg"},{"path":"hw1 solutions.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw1.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw2 solutions.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw2.pdf","is_dir":false,"mime_type":"application/pdf"},{"path":"hw3.pdf","is_dir":false,"mime_type":"application/pdf"}]';

var model = {
    "andrewId":"msebek",
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


var makeRowsMobile = function(myDocs){
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
      else if (myDocs[i].mime_type === "application/vnd.ms-powerpoint" || myDocs[i].mime_type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"){
          ftype = "msftppt";
      }
      document.write("<li id='row" + i.toString() +
                     "'><a href='#'>" + 
                     "<div class='tblrow'><img class='file-thumbnail' src='icons/" + ftype +
                     ".jpg'><h5>" + myDocs[i].path + 
                     "</h5><button class='print btn btn-success' type='button' onclick='print(\"" +
                     i.toString() + "\")'>Print</button>" +
                     "<button class='delete btn btn-danger' type='button' onclick='delListItem(\"" +
                     i.toString() + "\")'>Delete</button></div></a></li>");
    };
    return;
}

// Initialize the page.
$(document).ready(function() {
    $.ajaxSetup ({
      cache: false
    });

    var serverUrl = "http://printbox.servebeer.com/index"
}) 

function init() {
    // Populate the model
    if(FORGEDATA == true) {
        console.log("using forged data...")
        nextFn(JSON.parse(fakeData));
    } else {
    $.ajax({
        type: "GET",
        url: "http://printbox.servebeer.com/index",
        async: false,
        dataType: "json",
        success: nextFn,
        error: function(err){
            console.log("Error condition");
            console.log(err)}
    });
	mixpanel.track("print_page_loggedIn");
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
    //console.log("populate!");
    console.log(jsonString);
    var fileArray = jsonString;
    //console.log("called! got json : " + jsonString);

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
                     "<div class='tblrow'><img class='file-thumbnail' src='/assets/images/icons/" + ftype +
                     ".jpg'><h5>" + myDocs[i].path + 
                     "</h5><button class='print btn btn-success' type='button' onclick='printFile(\"" +
                     i.toString() + "\")'>Print</button>" +
                     "<button class='delete btn btn-danger' type='button' onclick='delListItem(\"" +
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

    if ($(".tblrow").length <= 0) {
        $("#empty").show();
    }
    //document.getElementById(objId).style.display = 'none'; 
    return;
}

function getRowFromFileId(fileId) {
    rows = model["rows"];
    for(var i=0; i < rows.length; i++) {
        if(rows[i]["rowId"]==fileId) {
            return rows[i]
        }
    }
    return null
}

function deleteFile(fileId) {
    // Send the POST request
    console.log("[delete issued]");
    var file = getRowFromFileId(fileId);
    //console.log(fileId);
    //console.log(file);
    console.log(file["path"]);
    $.ajax({
        type: "POST",
        url: "http://printbox.servebeer.com/delete/"+file["path"],
        async: false,
        dataType: "json",
        success: function() {console.log("delete sent!")},
        error: function(err){
            console.log("something bad");
            console.log(err)}
    });

    // Update the model


}


function delListItem(rowId){
    // When displaying "are you sure", add sure class, which you will
    //  then check for when you delete.
    var delButton = $("#row"+rowId+" a .tblrow button.delete");
    var delRow = $("#row"+rowId)

    console.log($("#row"+rowId+" a .tblrow button.sure"));
    if($("#row"+rowId+" a .tblrow button.sure").length == 1) {
        delRow.slideUp("slow", function() {
            document.getElementById("row"+rowId).style.display='none';
            //document.getElementById("row"+rowId).removeChild();
            console.log($(".tblrow").length);
            deleteFile(rowId);
        });

        // TODO: remove row from model
    } else {
        delButton.hide();
        delButton.text("Are you sure?");
        delButton.addClass("btn-warning sure").removeClass("btn-danger");
        delButton.fadeIn("slow");
    }
    //printButton.fadeIn("slow");

    if ($(".tblrow").length <= 0) {
        console.log("no more items!");
        $("#empty").show();
    }

    return;
}

function getAndrew() {
    var andrewId = $("#idandrew")[0].value;
    return andrewId;
}

function printFile(fileId) {
    var printButton = $("#row"+fileId+" a .tblrow button.print");

    var andrewId = getAndrew();

    if (!andrewId || andrewId.length == 0) {
        $("#idandrew").focus();
        $(".alert").alert();
        return;
    }

    printButton.addClass("btn").removeClass("btn-success").addClass("btn-primary");
    printButton.text("Print Again");
    printButton.fadeIn("slow");

    // Send the POST request
    console.log("[print issued]");
    var file = getRowFromFileId(fileId);
    //console.log(fileId);
    //console.log(file);
    //console.log("http://printbox.servebeer.com/print/"+
        andrewId+"/"+file["path"]);
    $.ajax({
        type: "POST",
        url: "http://printbox.servebeer.com/print/"+
            andrewId+"/"+file["path"],
        async: true,
        dataType: "json",
        success: function() {console.log("[print sent!]")},
        error: function(err){
            console.log("something bad in print");
            console.log(err)}
    });
	mixpanel.track("document_printed", {
		'andrewId': andrewId
	});

    // Update the model
}
