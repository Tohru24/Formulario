document.querySelector('#btnSubmit').addEventListener('click', saveData);
printTable();



function saveData() {
    var saveFormName = document.querySelector('#inputName').value;
    var  saveFormSurname = document.querySelector('#inputSurname').value;
    var  saveFormAddress = document.querySelector('#inputAddress').value;
    var  saveFormPhone = document.querySelector('#inputPhone').value;
    var  saveFormEps = document.querySelector('#selectEPS').value;
    var  saveFormStatus= document.querySelector('#selectStatus').value;
    var  saveFormAuthorization = document.querySelector('#form-checkbox').checked;    
    
    addData(saveFormName,saveFormSurname,saveFormAddress,saveFormPhone,saveFormEps,saveFormStatus,saveFormAuthorization);
    printTable();
}

function printTable() {

    var lista = getFormData(),
    tbody = document.querySelector('#form-table tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < lista.length; i++) {
        var row = tbody.insertRow(i);
        var nameRow = row.insertCell(0);
        var surnameRow= row.insertCell(1);
        var addressRow= row.insertCell(2);
        var phoneRow= row.insertCell(3);
        var epsRow=row.insertCell(4);
        var statusRow=row.insertCell(5);
        var authorizationRow=row.insertCell(6);
           
        
        nameRow.innerHTML = lista[i].name;
        surnameRow.innerHTML = lista[i].surname;
        addressRow.innerHTML = lista[i].address;
        phoneRow.innerHTML = lista[i].phone;
        epsRow.innerHTML= lista[i].eps;
        if (lista[i].status === "· Activo") {
            statusRow.innerHTML= "<p class='statusActivo'>"+lista[i].status+"</p>";
        } else if (lista[i].status === "· Inactivo") {
            statusRow.innerHTML= "<p class='statusInactivo'>"+lista[i].status+"</p>";
        } else{
            statusRow.innerHTML=lista[i].status;
        }
        if (lista[i].authorization) {
            authorizationRow.innerHTML= lista[i].authorization;
            /*authorizationRow.innerHTML=  '<p class="check"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg> </p>';*/
            
        }
        else if(lista[i].authorization === false){
            authorizationRow.innerHTML= lista[i].authorization;
            /*authorizationRow.innerHTML= '<p class="uncheck"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></p>'*/

        }
        tbody.appendChild(row);
    
    }
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('form-table');
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
