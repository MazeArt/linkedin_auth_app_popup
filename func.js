function myfunc1(){
    console.log("this is funk 1 ");


}

function myfunc2(token){
    console.log("this is funk 2 and token: " + token);
    myfunc1();

}
/// EXPORTING MODULES

//exports.getLinkedinId(accessToken);
//exports.myfunc();

module.exports = { myfunc2 };