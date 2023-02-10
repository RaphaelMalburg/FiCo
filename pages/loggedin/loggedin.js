function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href = "./../home/index.html"
    }).catch(()=>{
        alert('Ooops, a problem happened during the logout')
    })}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user)
    }
})

function findTransactions(user){
   showLoading()
    transactionService.findByUser(user)
        .then(transactions =>{
            hideLoading()
            addTransactionsToScreen(transactions)
        })
        .catch(error =>{
            hideLoading()
            console.log(error)
            alert('Error during transactions recover')
        })
}

function newTransaction(){

    window.location.href = './../transaction/transaction.html'
}

function addTransactionsToScreen(transactions){
   const unorderedList = document.getElementById('transactions')

   transactions.forEach(transaction => {
    
    const ul = document.createElement('ul')
    ul.classList.add(transaction.type)
    ul.id = transaction.uid;
    ul.addEventListener('click', ()=> {
        window.location.href ='./../transaction/transaction.html?uid=' + transaction.uid;
    })


    const liLeft = document.createElement('li')
    const liRight = document.createElement('li')
    ul.appendChild(liLeft)
    ul.appendChild(liRight)
    const deleteButton = document.createElement('button')
    deleteButton.className = 'remove-button'
    deleteButton.innerHTML = 'Remove'
    
    deleteButton.addEventListener('click', event => {
        event.stopPropagation()
        askRemoveTransaction(transaction)
    })



    ul.appendChild(deleteButton)

    const transactionDate = document.createElement('p')
    transactionDate.innerHTML = formatDate(transaction.date);
    const transactionValue = document.createElement('h2')
    transactionValue.innerHTML = formatMoney(transaction.value);

    

    
    
    liRight.appendChild(transactionDate)
    liRight.appendChild(transactionValue )
    
    const transactionTitle = document.createElement('h2')
    
    transactionTitle.innerHTML = transaction.transactionType;
    
    liLeft.appendChild(transactionTitle)
    
    if(transaction.description){
     const transactionDescription = document.createElement('p')
     transactionDescription.innerHTML = transaction.description;   
     liLeft.appendChild(transactionDescription)
    } else{
     const transactionDescription = document.createElement('p')
     transactionDescription.innerHTML = ' -  '   
     liLeft.appendChild(transactionDescription)
    }

    
    unorderedList.appendChild(ul)
   });
}
function sumAmountMoney(transactions){


}
function askRemoveTransaction(transaction){
    const shouldRemove = confirm('Confirm the removal of the transaction?')
    if(shouldRemove){
        removeTransaction(transaction)
    }

}


function removeTransaction(transaction){
    showLoading()
    transactionService.remove(transaction) 
        .then(() =>{
            hideLoading()
            
            document.getElementById(transaction.uid).remove();
        })
        .catch(error => {
            hideLoading()
            console.log(error)
            alert('Error removing transaction')
        })

}
function formatDate(date){
    return new Date(date).toLocaleDateString('pt-pt')
}
function formatMoney(value){
    return `${value.toFixed(2)}  €`
}

