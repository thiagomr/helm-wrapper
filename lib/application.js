const { execSync } = require('child_process');
const errors = require('./errors');
const schema = require('./schema');

const {
    validateParameters,
    parseArgs
} = require('./helper');

class Application {
    /**
     *
     * @param {string} release
     * @param {string} chart
     * @param {string[]} flags
     */
    install(release, chart, flags) {
        try {
            const name = 'install';

            validateParameters({
                release,
                chart,
                flags
            }, schema[name]);

            const args = parseArgs([release, chart, '-o json', ...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return JSON.parse(output);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} release
     * @param {string[]} flags
     */
    uninstall(release, flags) {
        try {
            const name = 'uninstall';

            validateParameters({
                release,
                flags
            }, schema[name]);

            const args = parseArgs([release, ...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return {
                message: output
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} release
     * @param {string} chart
     * @param {string[]} flags
     */
    upgrade(release, chart, flags) {
        try {
            const name = 'upgrade';

            validateParameters({
                release,
                chart,
                flags
            }, schema[name]);

            const args = parseArgs([release, chart, '-o json', ...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return JSON.parse(output);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string[]} flags
     */
    list(flags = []) {
        try {
            const name = 'list';
            const command = this.buildCommand(name, '-o json', flags);
            const output = this.exec(command);

            return JSON.parse(output);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} release
     * @param {string[]} flags
     */
    history(release, flags) {
        try {
            const name = 'history';
            validateParameters({
                release,
                flags
            }, schema[name]);

            const args = parseArgs([release, '-o json', ...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return JSON.parse(output);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} release
     * @param {number} revision
     * @param {string[]} flags
     */
    rollback(release, revision, flags) {
        try {
            const name = 'rollback';

            validateParameters({
                release,
                revision,
                flags
            }, schema[name]);

            const args = parseArgs([release, revision, ...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return {
                message: output
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {name} args
     * @param {string[]} flags
     * @returns {string}
     */
    custom (name, flags) {
        try {
            validateParameters({
                name,
                flags
            }, schema['custom']);

            const command = this.buildCommand(name, flags);
            const output = this.exec(command);

            return output;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} command
     * @param {string} args
     * @returns {string}
     */
    buildCommand(command, args) {
        return `helm ${command} ${args}`;
    }

    /**
     *
     * @param {string} command
     * @returns {string}
     */
    exec(command) {
        try {
            if (!command) {
                throw new errors.InvalidParamError('command');
            }

            const stdout = execSync(command, { stdio : 'pipe' });

            return stdout.toString();
        } catch (error) {
            throw new errors.CommandError(error.stderr);
        }
    }
};

module.exports = Application;
