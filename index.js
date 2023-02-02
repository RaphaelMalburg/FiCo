firebase.auth().onAuthStateChanged(user =>{
    if(user){
        window.location.href = './../../pages/loggedin/loggedin.html'
    }
})




function onChangeEmail(){
   toggleButtonsDisable();
   toggleEmailErrors();
   
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=> {
        hideLoading();
        alert('Email sent successfully')
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    })

}

function login(){
    showLoading()

    
    firebase.auth().signInWithEmailAndPassword(form.email().value,form.password().value).then(response => {
      console.log('success', response)
      hideLoading()
      window.location.href = './../../pages/loggedin/loggedin.html'
    }).catch(error => {
        alert(getErrorMessage(error))
        hideLoading()
    })
    

}

function getErrorMessage(error){
    if(error.code == 'auth/user-not-found'){
        return 'User not found'
    }
    if(error.code == 'auth/wrong-password'){
        return 'Invalid password'
    }
    return error.message
}


function register(){
    window.location.href = './../../pages/register/register.html'
    showLoading()

}

function toggleEmailErrors(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? 'none' : 'block'
   
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block'


}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    const recoverButton = form.recoverPassword()
    const loginButton = form.loginButton()
    const passwordValid = isPasswordValid();

    if(emailValid){
        recoverButton.removeAttribute('disabled')
    }else{
        recoverButton.setAttribute('disabled','')
    }

    
    if(!emailValid || !passwordValid){
        loginButton.setAttribute('disabled','')
    }else  {
        loginButton.removeAttribute('disabled')  
    }
}

function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? 'none' : 'block';
    
}

function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false
    }
    return true;
}

function isEmailValid(){
    const email = form.email().value;
    if (!email){
        return false;
    }
    return validateEmail(email)
}



const form = {
    email:() => document.getElementById('email'),
    password: ()=>  document.getElementById('password'),
    loginButton: () => document.getElementById('login-button'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    passwordRequiredError: () =>  document.getElementById('password-required-error'),
    emailRequiredError: () => document.getElementById('email-required-error')
}