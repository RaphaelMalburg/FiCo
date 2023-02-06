
 function onChangeDate(){
    const date =form.date().value;
    form.dateRequiredError().style.display = !date ?'block':'none';
    toggleSaveButtonDisabled()
 }

 function onChangeValue(){
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ?'block':'none';
    toggleSaveButtonDisabled()
 }

function onchangeTransactionType(){
    const transactionType = form.transactionType().value;
 
    form.transactionTypeError().style.display = !transactionType ?'block':'none';
    toggleSaveButtonDisabled()
}
function toggleSaveButtonDisabled(){
    form.saveButton().disabled = !isFormValid();


}

function isFormValid(){
    const date = form.date().value;
    if (!date){
        return false;
    }

    const value = form.value().value;
    if (!value){
        return false;
    }

    const transactionType = form.transactionType().value;
    if (!transactionType){
        return false;
    }
    return true;
}

 const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeError: () => document.getElementById('transaction-type-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    saveButton:() => document.getElementById('save-button')


 }