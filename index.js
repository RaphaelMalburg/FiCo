function validateFields(){
    const emailValid = isEmailValid();
    const recoverButton = document.getElementById('recover-password-button')
    if(emailValid){
        recoverButton.removeAttribute('disabled')
    }else{
        recoverButton.setAttribute('disabled','')
    }
    
     
    
}

function isEmailValid(){
    const email = document.getElementById('email').value;
    if (!email){
        return false;
    }
    return validateEmail(email)
}

function  validateEmail(email){
    return  /\S+@\S+\.\S+/.test(email)
    
}