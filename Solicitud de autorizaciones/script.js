$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
    var fileIdCounter = 0;    
    this.closest(".files").change(function (evt) {
    var output = [];
        
        for (var i = 0; i < evt.target.files.length; i++) {
            fileIdCounter++;
            var file = evt.target.files[i];
            var fileId = sectionIdentifier + fileIdCounter;

            filesToUpload.push({
                id: fileId,
                file: file
            });


            var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + fileId + "\">Remove</a>";

            output.push("<li><strong>", escape(file.name), "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li> ");
        };

        $(this).children(".fileList")
            .append(output.join(""));
            var a=document.getElementById("drag-area");
            a.classList.remove("active");


        //reset the input to null - nice little chrome bug!
        evt.target.value = null;
    });

    $(this).on("click", ".removeFile", function (e) {
        e.preventDefault();

        var fileId = $(this).parent().children("a").data("fileid");

        // loop through the files array and check if the name of that file matches FileName
        // and get the index of the match
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id === fileId)
                filesToUpload.splice(i, 1);
        }

        $(this).parent().remove();
    });

    this.clear = function () {
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
                filesToUpload.splice(i, 1);
        }

        $(this).children(".fileList").empty();
    }

    return this;
};

(function () {
    var filesToUpload = [];

    var files1Uploader = $("#files1").fileUploader(filesToUpload, "files1");

    $("#uploadBtn").click(function (e) {
        e.preventDefault();

        var formData = new FormData();

        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            formData.append("files", filesToUpload[i].file);
        }

        $.ajax({
            url: "http://requestb.in/1k0dxvs1",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                alert("DONE");

                files1Uploader.clear();
            },
            error: function (data) {
                alert("ERROR - " + data.responseText);
            }
        });
    });
})()

const dropArea = document.querySelector(".drag-area");

dropArea.addEventListener("dragOver",(e)=>{
    e.preventDefault();
    dragArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos"
})

dropArea.addEventListener("dragLeave",(e)=>{
    e.preventDefault();
    dragArea.classList.remove("active");

})

dropArea.addEventListener("drop",(file)=>{
    const docType= file.type;
    let validExtensions = ['application/x-zip-compressed','application/pdf','image/jpg', 'image/png']
   
      const fileReader= new FileReader();
      const id= 'file-${Math.random().toString(32).substring(7)}';
      fileReader.onload= ()=>{
        const fileUrl=fileReader.result;
        console.log(fileReader.result)
        const image = '<div id="${id}" class="file-container"><img src="${fileUrl}" alt="${file.name}"></img> <div class="status" width="50px"> <span>${file.name}</span> <span class="status-text"> Cargando... </span> </div> </div>  ';
        dragArea.innerHTML =image;
        
  
      };
  
      fileReader.readAsDataURL(file);
      uploadFile(file,id);
      
    
})

