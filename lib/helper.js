const errors = require('./errors');

/**
 * @ignore
 * @param {string[]} parameters
 */
exports.parseArgs = (parameters) => {
    let command = '';

    for (const parameter of parameters) {
        if (!parameter) {
            continue;
        }

        command += `${parameter} `;
    }

    return command.trim();
};

/**
 * @ignore
 * @param {object} parameters
 * @param {object} schema
 */
exports.validateParameters = (parameters, schema) => {
    if (typeof parameters !== 'object') {
        throw new errors.InvalidParamError('invalid parameters object');
    }

    if (typeof schema !== 'object') {
        throw new errors.InvalidParamError('invalid schema object');
    }

    for (const key in schema) {
        if (schema[key].required && !parameters.hasOwnProperty(key)) {
            throw new errors.MissingParamError(`[${key}]`);
        }

        if (schema[key].required && schema[key].type !== typeof parameters[key]) {
            throw new errors.MissingParamError(`[${key}]`);
        }
    }

    if (parameters.flags) {
        if (!Array.isArray(parameters.flags)) {
            throw new errors.InvalidParamError('[flags]');
        }

        for (const flag of parameters.flags) {
            if (typeof flag !== 'string') {
                throw new errors.InvalidParamError('[flag]');
            }
        }
    }
};
