const { execSync } = require('child_process');
const errors = require('./errors');
const schema = require('./schema');

const {
    validateParameters,
    parseArgs
} = require('./helper');

/**
 * @class
 * @hideconstructor
 */
class Helm {
    /**
     * @param {string} release - Name of release
     * @param {string} chart - Name of chart (remote or local)
     * @param {string[]} flags - Flags of `helm install` command
     * @example
     *
     * //install a package
     * helm.install('nginx', 'bitnami/nginx');
     *
     * //install on custom namespace, setting env variables
     * helm.install('api', 'myrepo/api', ['-n dev', '--set PORT=8000']);
     *
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
     * @param {string} release - Name of release
     * @param {string[]} flags - Flags of `helm unintall` command
     * @example
     *
     * helm.uninstall('nginx');
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
     * @param {string} release - Name of release
     * @param {string} chart - Name of chart
     * @param {string[]} flags - Flags of `helm upgrade` command
     * @example
     *
     * //upgrade a package
     * helm.upgrade('mychart', 'repo/mychart');
     *
     * //upgrade a package with flags
     * helm.upgrade('mychart', 'repo/mychart', ['--install', '-n dev']);
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
     * @param {string[]} flags - Flags of `helm list` command
     * @example
     *
     * //list pcakages
     * helm.list();
     *
     * //list packages from specific namespace
     * helm.list(['-n dev']);
     */
    list(flags = []) {
        try {
            const name = 'list';
            flags.push('-o json');
            const command = this.buildCommand(name, flags.join(' '));
            const output = this.exec(command);

            return JSON.parse(output);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param {string} release - Name of release
     * @param {string[]} flags - Flags of `helm history` command
     * @example
     *
     * helm.history('mychart');
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
     * @param {string} release - Name of release
     * @param {number} revision - Number of revision
     * @param {string[]} flags - Flags of `helm rollback` command
     * @example
     *
     * helm.rollback('mychart', 1);
     *
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
     * @param {string} repositoryName - Name of repository
     * @param {string} url - URL from repository
     * @param {string[]} flags - Flags of `helm repo add` command
     * @example
     *
     * // add a repo
     * helm.addReposistory('myrepo', 'https://mycharts.example');
     *
     * // add a repo with authentication
     * helm.addReposistory('myrepo', 'https://mycharts.example', ['--user foo', '--password bar']);
     */
    addRepository(repositoryName, url, flags) {
        try {
            const name = 'repoAdd';

            validateParameters({
                repositoryName,
                url,
                flags
            }, schema[name]);

            const args = parseArgs([repositoryName, url, ...flags || []]);
            const command = this.buildCommand('repo add', args);
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
     * @param {name} args - Command of helm
     * @param {string[]} flags - Flags of command
     * @example
     *
     * helm.custom('repo list');
     */
    custom (name, flags) {
        try {
            validateParameters({
                name,
                flags
            }, schema['custom']);

            const args = parseArgs([...flags || []]);
            const command = this.buildCommand(name, args);
            const output = this.exec(command);

            return output;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @ignore
     * @param {string} command
     * @param {string} args
     * @returns {string}
     */
    buildCommand(command, args) {
        return `helm ${command} ${args}`;
    }

    /**
     * @ignore
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

module.exports = Helm;
