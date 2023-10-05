require('dotenv').config()

const DBConect = require('./db_connect')
const app = require('./app.js')
const httpPort = process.env.PORT || 5000;


(async () => {
    try {
    await DBConect()
    app.listen(httpPort, () => console.log(`Server has been started on ${httpPort}`))
    } catch (e) {
        console.log(e);
    }
})();