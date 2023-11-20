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

    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
        const avatar = "./avatar/1.jpg"
        const gold = 0
        const nickname="player"
        const capital=0
        const user = await UserModel.create({email, password: hashPassword, activationLink, avatar, gold, nickname, capital})
        /*await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);*/

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }


    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();
