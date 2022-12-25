const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

/**body-parser — пакет анализирует тела входящих запросов
 *  в промежуточном программном обеспечении перед вашими 
 * обработчиками, доступными в req.body свойстве
 * 
*/
const bodyParser = require('body-parser')

const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')


const keys = require('./config/keys')
const app = express()

mongoose.set('strictQuery', true)
mongoose.connect(keys.mongoURI)
    .then(() => console.log('mongoDB connect'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())

/** просматривает запросы, с кодировкой URL. 
 * extended: trueу точняется, что объект req.body
 * будет содержать значения любого типа, а не только строки.
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только тела {urlencoded} и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает только кодировку тела UTF-8 и поддерживает автоматическое расширение кодировок gzip и deflate.

Новый объект тела, содержащий проанализированные данные, заполняется в объекте запроса после промежуточного программного обеспечения (т.е. req.body). Этот объект будет содержать пары ключ-значение, где значение может быть строкой или массивом (если расширено — false) или любым типом (когда расширено — true).*/
app.use(bodyParser.urlencoded({extended: true}))

/** просматривает запросы, в которых присутствует
 *  Content-Type: application/jsonзаголовок,
 *  и преобразует текстовый ввод JSON 
 * в доступные для JS переменные в req.body
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только JSON и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает любую кодировку Unicode тела и поддерживает автоматическое расширение кодировок gzip и deflate.*/
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)

/**Экспортирует модуль в server.js */
module.exports = app