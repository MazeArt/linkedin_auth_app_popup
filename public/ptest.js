


function get_token(){
    console.log("FUNCTIN GET TOKEN CALLED");
    var accessTokenObj = localStorage.getItem("access_token");
    console.log("this is the access token: " + accessTokenObj)
}

let btn = document.getElementById("do-call");
btn.addEventListener('click', event => {
    get_token();
});






