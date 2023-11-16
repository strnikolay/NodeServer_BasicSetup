const express = require('express')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const Routes = require('./routes/route')
require('./middleware/passport')(passport)

const app = express()



app.use(passport.initialize())
app.use(morgan('dev'))
app.use(cors())

app.use(errorHandler);

/** просматривает запросы, с кодировкой URL. 
 * extended: trueу точняется, что объект req.body
 * будет содержать значения любого типа, а не только строки.
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только тела {urlencoded} и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает только кодировку тела UTF-8 и поддерживает автоматическое расширение кодировок gzip и deflate.

Новый объект тела, содержащий проанализированные данные, заполняется в объекте запроса после промежуточного программного обеспечения (т.е. req.body). Этот объект будет содержать пары ключ-значение, где значение может быть строкой или массивом (если расширено — false) или любым типом (когда расширено — true).*/
app.use(express.urlencoded({extended: true}))



/** просматривает запросы, в которых присутствует
 *  Content-Type: application/json заголовок,
 *  и преобразует текстовый ввод JSON 
 * в доступные для JS переменные в req.body
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только JSON и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает любую кодировку Unicode тела и поддерживает автоматическое расширение кодировок gzip и deflate.*/
app.use(express.json())

app.use('/api', Routes)

module.exports = app