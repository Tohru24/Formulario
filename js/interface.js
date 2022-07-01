var formData = [];

function addData(formName, formSurname, formAddress,formPhone,formEps,formStatus,formAuthorization) {
    
    var newData = {
        name: formName,
        surname: formSurname,
        address:formAddress,
        phone:formPhone,
        eps:formEps,
        status:formStatus,
        authorization:formAuthorization,
    };

    console.log(newData); 
    formData.push(newData);
}

 function getFormData() {
    return formData;
}