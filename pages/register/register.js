function onChangeEmail(){
    const email = form.email().value
    form.emailRequiredError().style.display = email ?'none':'block';

    
    form.emailInvalidError().style.display = validateEmail(email) ?'none':'block';
    toggleRegisterButtonDisable()
}

firebase.auth().onAuthStateChanged(function (user){
    if(user){
        window.location.href = './../../pages/loggedin/loggedin.html'
    }
})

function register (){
    showLoading()
    const email = form.email().value
    const password = form.password().value

    firebase.auth().createUserWithEmailAndPassword
    (email,password).then(() => {console.log('passou por aqui')
        hideLoading() 
        window.location.href = './../../pages/login/login.html'
    }).catch(error => {
         hideLoading()
         alert(getErrorMessage(error))
    })
}

function getErrorMessage(error){
    if(error.code == 'auth/email-already-in-use'){
        return 'Email address already in use'
    }
    return error.message
}

function onChangePassword(){
    const password = form.password().value

    form.passwordRequiredError().style.display = password ? 'none' :'block';
    form.passwordMinLengthError().style.display = password.length >= 6 ? 'none': 'block';
    validatePasswordsMatch()
    
    toggleRegisterButtonDisable()
}

function onChangeConfirmPassword(){
    
    validatePasswordsMatch()
    toggleRegisterButtonDisable()
}

function validatePasswordsMatch(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value

    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? 'none' : 'block';
}

function isFormValid(){
    const email = form.email().value;

    if(!email || !validateEmail(email)){
        return false;

    }
    const password = form.password().value;
    if(!password || password.length < 6){
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword){
        return false;
    }
    
    return true;

}

function toggleRegisterButtonDisable(){
    
    const registerButton = form.registerButton()
    
    if(isFormValid()){
        registerButton.removeAttribute('disabled')
    }else{
        registerButton.setAttribute('disabled','')
    }
    

}


const form = {
    email:() => document.getElementById('email'),
    emailInvalidError:() => document.getElementById('email-invalid-error'),
    emailRequiredError:() => document.getElementById('email-required-error'),
    password:() => document.getElementById('password'),
    confirmPassword:() => document.getElementById('confirmPassword'),
    passwordRequiredError:() => document.getElementById('password-required-error'),
    confirmPasswordDoesntMatchError:() => document.getElementById('password-doesnt-match-error'),
    passwordMinLengthError:() => document.getElementById('password-min-length-error'),
    registerButton:() => document.getElementById('register-button')
} 

