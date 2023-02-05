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
    const li = document.createElement('li')
    
    ul.classList.add(transaction.type)
    ul.appendChild(li)
    unorderedList.appendChild(ul)
    
   });
}

const fakeTransactions = [
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