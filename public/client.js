// definir que el boton ejecute una funcion
    // extraer el token guarado en locastorage  
//y llamar al server post-to-linkedin


//Subir la foto a S3
const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event =>{
    event.preventDefault()
    const file = imageInput.files[0]

    // get secure url from our server
    const { url } = await fetch("/s3Url").then(res => res.json())
    //console.log(url)

    // post image directly to s3 bucket
    await fetch(url , {
        method:"PUT",
        headers:{
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split('?')[0]
    console.log(imageUrl )


    //post request to my server to store data

    const img = document.createElement("img")
    img.src = imageUrl
    document.body.appendChild(img)
})


// BOTON PART 2
let submit_btn = document.querySelector('#button')

submit_btn.addEventListener('click', () => {
    let access_token = localStorage.getItem('access_token')

    $.ajax({ url: '/post-to-linkedin', type: 'GET', data: { access_token: access_token } })

})


// foto dummy
/// como subir una foto a un server .