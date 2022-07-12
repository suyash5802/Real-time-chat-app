const moment=require('moment')
function nametime(name,text){

    return{
        username:name,
        text:text,
        time:moment().format('h:mm:ss a')
    } 

}
module.exports=nametime;