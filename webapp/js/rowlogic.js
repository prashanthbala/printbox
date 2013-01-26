var makeRows = function(myDocs){
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

var error = function(){
  document.write("<li>Super Sad Faces Everywhere</li>");
  return;
}


var print = function(objId){
    var printButton = $("#row"+objId+" a .tblrow button.print");
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

var del = function(objId){
    // When displaying "are you sure", add sure class, which you will
    //  then check for when you delete.
    var delButton = $("#row"+objId+" a .tblrow button.delete");
    var delRow = $("#row"+objId)

    if($("#row"+objId+" a .tblrow button.sure").length == 1) {
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