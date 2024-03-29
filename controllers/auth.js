const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../ModelsMongoDB/User')
const errorHandler = require('../utils/errorHandler')

//const SMSru = require('sms_ru')
//const sms = new SMSru("заменить на токен полученый от сервиса");

/**Генерация пароля*/
/*function generatePassword() {
    var length = 5,
    charset = "0123456789",
    retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}*/

module.exports.login = async function(req, res) {
    try{
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {next(e);}



    /*if (candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        /**логин и пароль верный */
        /*if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                //phone: candidate.phone,      //если логин по телефону
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60 })
            res.status(200).json({
                token: `Bearer ${token}`
            })
            
        } else {
            res.status(401).json({
                message: 'пароль не верный'
            })
        }*/
    /*} else {
        res.status(404).json({
            message: 'пользователь не существует'
        })
    }*/
}

module.exports.registration = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if (candidate){
        res.status(409).json({
            message: 'пользователь существует'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        /**введеный пользователем пароль*/
        const password = req.body.password
        /**или сгенерированый*/    
        //const password = generatePassword()
        

        /**Отправка пароля по смс */
        /*sms.sms_send({
            to: req.body.phone,
            text: password
        }, function(e){
            console.log(e.description);
        })*/


        const user = new User({
            email: req.body.email,
            //phone: req.body.phone,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            //errorHandler(res, e)  
        }
    }


    
}

async logout(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}

async activate(req, res, next) {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);
        return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        next(e);
    }
}

async refresh(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}