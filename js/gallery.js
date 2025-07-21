document.addEventListener("click",function(e){
    if(e.target.classList.contains("gallery-items")){
        const src = e.target.getAttribute("src");
        console.log(src);

    }
})