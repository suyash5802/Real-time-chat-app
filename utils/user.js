const users=[

]
function userjoin(id,username,room){
    const user={id,username,room}
    users.push(user);
    return user;
}

function getusername(id)
{
    return users.find(user=>user.id===user )
}

module.exports={
    userjoin,getusername
}