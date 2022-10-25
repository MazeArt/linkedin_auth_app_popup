


function get_token(){
    console.log("FUNCTIN GET TOKEN CALLED");
    var accessTokenObj = JSON.parse(localStorage.getItem("access_token"));
    console.log("this is the access token:" + accessTokenObj)
}



// module.exports = {

//     get_token: function(){
//         console.log("FUNCTIN GET TOKEN CALLED");
//         var accessTokenObj = JSON.parse(localStorage.getItem("access_token:"));
//         console.log("this is the access token:" + accessTokenObj);
//     }
// }