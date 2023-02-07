if (!isNewTransaction()){
    const uid = getTransactionUid()
    findTransactionByUid(uid)
}

 function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid')
 }

 function isNewTransaction(){
    return getTransactionUid()? false :true;
 }

 function findTransactionByUid(uid){
    showLoading()

    transactionService.findByUid(uid)

        .then(transaction => {
            hideLoading()
            if(transaction){
                fillTransactionScreen(transaction)
                toggleSaveButtonDisabled()
            } else {
                alert ('Document not found')
                window.location.href = './../loggedin/loggedin.html'
            }
        })
        .catch(() =>{
            hideLoading()
            alert ('Document not recovered')
            window.location.href = './../loggedin/loggedin.html'
        })


 }
 
 function fillTransactionScreen(transaction){
    if(transaction.type == 'expense'){
        form.typeExpense().checked = true;
    }   else {
        form.typeIncome().checked = true;
    }
    
    form.date().value = transaction.date;
    form.value().value = transaction.value;
    form.transactionType().value = transaction.transactionType;
    
    if(transaction.description){
        form.description().value = transaction.description
    }

 }
 
 function onChangeDate(){
    const date =form.date().value;
    form.dateRequiredError().style.display = !date ?'block':'none';
    toggleSaveButtonDisabled()
 }

function saveTransaction(){
    showLoading();
    const transaction = createTransaction();

   if (isNewTransaction()){
    save(transaction)
   }else{
    update(transaction)
   }

}

function update(transaction){
    showLoading()
    transactionService.update(transaction)
         .then(() =>{
            hideLoading()
            window.location.href = './../loggedin/loggedin.html'
         })
         .catch(() =>{
            hideLoading()
            alert ('Document updated')
            window.location.href = './../loggedin/loggedin.html'
        })
}


function save(transaction){
    transactionService.save(transaction)
    .then(() =>{
        hideLoading();
        window.location.href = './../loggedin/loggedin.html';
    })
    .catch(() =>{
        hideLoading();
        alert('Error saving transaction')
        
    })

}


function createTransaction(){
    return { 
            type: form.typeExpense().checked ? 'expense': 'income',
            date: form.date().value,
            value: parseFloat(form.value().value),
            transactionType: form.transactionType().value,
            description: form.description().value,
            user:{
                uid:firebase.auth().currentUser.uid
            }
        }}



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
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeError: () => document.getElementById('transaction-type-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    saveButton:() => document.getElementById('save-button'),
    typeExpense:() => document.getElementById('expense'),
    typeIncome:() => document.getElementById('income')


 }