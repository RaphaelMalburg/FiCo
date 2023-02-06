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
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==' ,user.uid )
        .orderBy('date','desc')
        .get()
        .then(snapshot =>{
            hideLoading()
           const transactions = snapshot.docs.map(doc => doc.data())
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

    const liLeft = document.createElement('li')
    const liRight = document.createElement('li')
    ul.appendChild(liLeft)
    ul.appendChild(liRight)


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

function formatDate(date){
    return new Date(date).toLocaleDateString('pt-pt')
}
function formatMoney(value){
    return `${value.toFixed(2)}  €`
}
