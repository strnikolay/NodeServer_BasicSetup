require('dotenv').config()
const express = require('express')
const app = express()

/**выводит в лог url если на сервер пришел запрос*/
app.use(function (req, res, next) {
	console.log(req.url);
	next();
});

const passport = require('passport')
require('./middleware/passport')(passport)
app.use(passport.initialize())


const morgan = require('morgan')
app.use(morgan('dev'))


const cors = require('cors')
app.use(cors({
	origin: process.env.CLIENT_URL , 
    credentials: true
}))

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
app.use(errorHandler);

/** просматривает запросы, с кодировкой URL. 
 * extended: trueу точняется, что объект req.body
 * будет содержать значения любого типа, а не только строки.
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только тела {urlencoded} и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает только кодировку тела UTF-8 и поддерживает автоматическое расширение кодировок gzip и deflate.

Новый объект тела, содержащий проанализированные данные, заполняется в объекте запроса после промежуточного программного обеспечения (т.е. req.body). Этот объект будет содержать пары ключ-значение, где значение может быть строкой или массивом (если расширено — false) или любым типом (когда расширено — true).*/
app.use(express.urlencoded({extended: true}))


/**для работы с cookie*/
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SECRET_KEY));


/**для предоставления статических файлов. Например изображений*/
const path = require("path");
app.use(
	express.static(path.resolve(__dirname, "static"), { maxAge: 86400000 * 30 }),
);

/** просматривает запросы, в которых присутствует
 *  Content-Type: application/json заголовок,
 *  и преобразует текстовый ввод JSON 
 * в доступные для JS переменные в req.body
 * 
 * Возвращает ПО промежуточного слоя, которое анализирует только JSON и просматривает только те запросы, в которых заголовок Content-Type соответствует параметру type. Этот синтаксический анализатор принимает любую кодировку Unicode тела и поддерживает автоматическое расширение кодировок gzip и deflate.*/
app.use(express.json())

/**для загрузки файлов на сервер */
const fileUpload = require("express-fileupload");
app.use(fileUpload({}));


const Router = require('./routes/index')
app.use('/api', Router)

module.exports = app