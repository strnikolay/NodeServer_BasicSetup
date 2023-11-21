/**модель экспорта на фронтэнд в data.user */

module.exports = class UserDto {
    email;
    id;
    isActivated;
    avatar;
    nickname

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.avatar = model.avatar;
        this.nickname = model.nickname;
    }
}