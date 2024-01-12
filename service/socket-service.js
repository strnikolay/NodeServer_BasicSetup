const onlineModel = require('../models/online-model');

class SocketService {
    async onConnection(socket){
        const name = socket.handshake.query
        const nickname = name.nickname
        console.log(nickname, 'connected! socket:', socket.id );
        const online = await onlineModel.findOne({nickname});
        if (!online) {
            console.log('Новый Пользователь')
            await onlineModel.create({nickname: nickname, ava: ava})
        } else {
            console.log("уже есть");
        }
        
        socket.on('disconnect', async function(){
        await onlineModel.deleteOne({nickname})
        console.log(name.nickname, 'disconnect! socket:', socket.id );
    })}

    /*async joinRoom(){ const name = socket.handshake.query
    //console.log(name.nickname)
    let u = 0
    usersonline.forEach(function(usersonline) {
        if (usersonline.name === name.nickname){
            u += 1;
        } else {
            //console.log("еще нет")
            //usersonline.push({name:name.nickname, ava:name.ava}); 
        }
        console.log (u)
    })
    //console.log (`df`+u)
    if (u==0){
        usersonline.push({name:name.nickname, ava:name.ava}); 
    }
    //usersonline.push({name:name.nickname, ava:name.ava});
    //console.log(typeof usersonline)
    socket.emit("newconnect", usersonline);
    socket.emit("refresh", usersonline)
    socket.on("addMess", (time, inickname) =>{
        console.log(time, inickname)
    })
    
    } */

};

module.exports = new SocketService()