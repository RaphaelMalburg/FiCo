function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href = "./../home/index.html"
    }).catch(()=>{
        alert('Ooops, a problem happened during the logout')
    })}

findTransactions();

function findTransactions(){
    
    setTimeout(() =>{
        
        addTransactionsToScreen(fakeTransactions);
    },1000)
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

const fakeTransactions = [
    {
    type: 'expense',
    date: '2023/01/04',
    value: -10.50,
    transactionType: 'market'
    },
    {
    type: 'income',
    date: '2023/01/07',
    value: 1875,
    transactionType: 'salary',
    description: 'Company blue'
    },
    {
    type: 'expense',
    date: '2023/01/04',
    value: 10,
    transactionType: 'market'
    },
    {
    type: 'income',
    date: '2023/01/07',
    value: 1875,
    transactionType: 'salary',
    description: 'Company blue'
    }] 