class ApiError extends Error {
    constructor(status, message, errors = []) {
        //super(message)
        super();
        this.status = status
        this.message = message
        this.errors = errors;
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}

module.exports = ApiError