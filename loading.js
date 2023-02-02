function showLoading(){
    const div = document.createElement('div')
    div.classList.add('loading')
    

    const loadingSpiral = document.createElement('img')
    loadingSpiral.src = './../../assets/loading.gif'

    div.appendChild(loadingSpiral)
    
    document.body.appendChild(div)

    
}

function hideLoading(){
    
   const loadings = document.getElementsByClassName('loading')
    if(loadings.length){
        loadings[0].remove()
    }
}