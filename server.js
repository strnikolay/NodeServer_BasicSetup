require('dotenv').config()

const DBConect = require('./Mongodb_connect')
const app = require('./app.js')
const httpPort = process.env.PORT || 5000;


(async () => {
    try {

    /*Подключение Баз Данных
     * MongoDB*/    
    await DBConect()
    /**Или PastgreSQL */    
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });    

    app.listen(httpPort, () => console.log(`Server has been started on ${httpPort}`))
    } catch (e) {
        console.log(e);
    }
})();