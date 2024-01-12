require('dotenv').config()


const DBConect = require('./Mongodb_connect')
const app = require('./app.js')

const SocketServer = require("http").createServer();
const WSServer  = require ("socket.io")(SocketServer, {
    cors:{
        origin:"http://localhost:3000"
    }
});
const socketService = require('./service/socket-service')

const httpPort = process.env.PORT || 5000;
const WSPORT = process.env.WSPORT || 8000;


(async () => {
    try {
    /*Подключение Баз Данных
     * MongoDB*/    
    DBConect()
    /**Или PastgreSQL */    
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });    

    app.listen(httpPort, () => console.log(`Server has been started on ${httpPort}`))
    SocketServer.listen(WSPORT, () => console.log(`Socket started on PORT = ${WSPORT}`))
    } catch (e) {
        console.log(e);
    }
})();