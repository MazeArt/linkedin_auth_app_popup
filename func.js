function myfunc1(){
    console.log("my functiontest ");

}

function myfunc2(token){
    console.log("my functiontest 2 token : " + token);

}
/// EXPORTING MODULES

//exports.getLinkedinId(accessToken);
//exports.myfunc();

module.exports = { myfunc1 , myfunc2 };