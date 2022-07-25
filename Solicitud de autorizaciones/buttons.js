var medkitButton = document.getElementById("button-medkit")
var hospitalButton = document.getElementById("button-hospital")
var group2Button = document.getElementById("button-group-2")
var diagnosisButton = document.getElementById("button-diagnosis")
var procedureButton = document.getElementById("button-procedure")
var otherButton = document.getElementById("button-other")
var formulario = document.getElementById("formulario");
var procedureInput =document.getElementById("procedureInput");
medkitButton.onclick = show;
hospitalButton.onclick = show;
diagnosisButton.onclick = show;
procedureButton.onclick = show;
otherButton.onclick = show;
function show() {
  if (this === medkitButton) {
    medkitButton.classList.add("selected");
    hospitalButton.classList.remove("selected");
    group2Button.classList.add("show");
    formulario.classList.remove("unshow");
    group2Button.classList.remove("unshow");
    diagnosisButton.classList.add("selected");
    procedureButton.classList.remove("selected");
    otherButton.classList.remove("selected");
  }
  else if (this === hospitalButton) {
    medkitButton.classList.remove("selected");
    group2Button.classList.add("unshow");
    hospitalButton.classList.add("selected");
    diagnosisButton.classList.remove("selected");
    procedureButton.classList.remove("selected");
    otherButton.classList.remove("selected");
  }
  else if (this === diagnosisButton) {
    diagnosisButton.classList.add("selected");
    procedureButton.classList.remove("selected");
    otherButton.classList.remove("selected");

  } else if (this === procedureButton) {
    diagnosisButton.classList.remove("selected");
    procedureButton.classList.add("selected");
    otherButton.classList.remove("selected");
    procedureInput.classList.remove("unshow");

  } else if (this === otherButton) {
    diagnosisButton.classList.remove("selected");
    procedureButton.classList.remove("selected");
    otherButton.classList.add("selected");

  }

}

let files;
const dragArea = document.querySelector(".drag-area");
const dragText = dragArea.querySelector("p");
const input = dragArea.querySelector("#input-file");

dragArea.addEventListener("click", (e) => {
  input.click();
});

input.addEventListener("change", (e) => {
  files = this.files;
  dragArea.classList.add("active");
  dragArea.classList.remove("active");

});


function processFile(file) {
  const docType = file.type;
  let validExtensions = ['application/x-zip-compressed', 'application/pdf', 'image/jpg', 'image/png']
  if (validExtensions.includes(docType)) {
    const fileReader = new FileReader();
    const id = 'file-${Math.random().toString(32).substring(7)}';
    fileReader.addEventListener('load', e => {
      const fileUrl = fileReader.result;
      const image = i = '<div id="${id}" class="file-container"> <img src="${fileUrl}" alt="${file.name}"></img> <div class="status" width="50px"> <span>${file.name}</span> <span class="status-text"> Cargando... </span> </div> </div>  ';
      const html = document.querySelector('#preview').innerHTML
      document.querySelector('#preview').innerHTML = image + html;

    });

    fileReader.readAsDataURL(file);
    uploadFile(file, id);

  } else {
    alert("No es un archivo válido ")

  }

}

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.classList.add("active");
  dragText.textContent = "Suelta para subir los archivos"

});

dragArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragArea.classList.remove("active");
  dragText.textContent = "Haz click o arrastra aqui los documentos de orden médica, historia clínica entre otros."
});

dragArea.addEventListener("drop", (e) => {
  

});

function uploadFile(file) {

}

