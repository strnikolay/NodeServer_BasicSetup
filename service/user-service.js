const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
//const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
//const ApiError = require('../exceptions/api-error');

class UserService {

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            //throw ApiError.BadRequest('Пользователь с таким email не найден')
            res.status(404).json({
                message: 'пользователь не существует'
            })
        }
        /**Сравнивает введенный пароль(password) и пароль полученый из базы(user.password) */
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            //throw ApiError.BadRequest('Неверный пароль');
            res.status(401).json({
                message: 'пароль не верный'
            })
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();
