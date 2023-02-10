
    const switchTheme = document.getElementById('toggle-theme')
    const lightIcon  = './../../assets/lighticon.svg'
    let toggle = true;
    const body =  document.body

    switchTheme.addEventListener('click', function(){
        toggle=!toggle
        if(toggle){
            switchTheme.src = './../../assets/lighticon.svg'
            body.classList.add('light-mode')
            body.classList.remove('dark-mode')
        }else{

          switchTheme.src = './../../assets/darkicon.svg'  
          body.classList.remove('light-mode')
          body.classList.add('dark-mode')
        }
        
    })

