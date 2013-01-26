var makeRows = function(myDocs){
    for (var i=0; i<myDocs.length; i++){
      var ftype = "sample";
      if (myDocs[i].mime_type === "image"){
          ftype = "image";
      }
      else if (myDocs[i].mime_type === "text"){
          ftype = "text";
      }
      else (myDocs[i].mime_type === "multimedia"){
          ftype = "multimedia";
      }
      document.write("<li><a href='#'>" + 
                     "<div class='tblrow'><img src='icons/" + ftype + ".jpg'><h5>" + 
                     myDocs[i].path + 
                     "</h5><button class='btn btn-success' type='button'>Print</button>" +
                     "<button class='btn btn-danger' type='button'>Delete</button></div></a></li>");
    }
    return;
}   
var error = function(){
  document.write("<li>Super Sad Faces Everywhere</li>");
}