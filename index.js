function onChangeEmail(){
   toggleButtonsDisable();
   toggleEmailErrors();
   
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
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

function  validateEmail(email){
    return  /\S+@\S+\.\S+/.test(email)
    
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