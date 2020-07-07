class MissingParamError extends Error {
    constructor(parameterName) {
        super(`missing param - ${parameterName}`);
    }
}

class InvalidParamError extends Error {
    constructor(parameterName) {
        super(`invalid param - ${parameterName}`);
    }
}

class CommandError extends Error {
    constructor(errorMessage) {
        super(`${errorMessage}`);
    }
}

module.exports = {
    MissingParamError,
    InvalidParamError,
    CommandError
};
