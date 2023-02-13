

const transactionService = {
    findByUser: user =>{
        return firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==' ,user.uid )
        .orderBy('date','desc')
        .get()
        .then(snapshot =>{
            hideLoading()
           return snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }))
           
        })
    },
    

    findByUid: uid =>{
        return firebase.firestore()
        .collection('transactions')
        .doc(uid)
        .get()
        .then(doc => {
            return doc.data()
            
        })
    },

    remove: transaction =>{
            return firebase.firestore()
            .collection('transactions')
            .doc(transaction.uid)
            .delete()
        },

    save: transaction =>{
        return firebase.firestore()
        .collection('transactions')
        .add(transaction)
    },

    update: transaction => {
        return firebase.firestore()
        .collection('transactions')
        .doc(getTransactionUid())
        .update(transaction)
    }
}

function formatMoney(value){
    return `${value.toFixed(2)}  €`
}




     

function sumAmountMoney(){

   
            
            
            
    firebase.firestore()
    .collection('transactions')
    .where('user.uid', '==' ,user.uid )
    .get()
    .then(snapshot => {
        console.log('passou')
        
      const total = snapshot.docs.reduce((sum, doc) => {
        const amount = doc.data().value;
        if (typeof amount === 'number' && !isNaN(amount)) {
          return sum + amount;
        }
        return sum;
      }, 0);
       
      
     const moneyValue= document.getElementById('money-amount')
     moneyValue.innerHTML = formatMoney(total)
      console.log(total);
    })  
    .catch(error =>{
            hideLoading()
            console.log(error)
            alert('Error during value recover')
        })
        }
    


    


   
   


