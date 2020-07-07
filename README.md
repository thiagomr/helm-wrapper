A helm wrapper for [node](http://nodejs.org).

```js
const helm = require('helm-wrapper');
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

You need to have Helm (>= v3.0) installed

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install helm-wrapper
```

## Features

  * Install packages
  * Upgrade packages
  * List packages
  * History of packages
  * Rollback packages
  * Uninstall packages
  * Custom commands

## Examples

```js
const helm = require('./index');

/**
 * install a release
 */
helm.install('nginx', 'bitnami/nginx');

/**
 * install a release with flags
 */
helm.install('nginx', 'bitnami/nginx', ['-n stage']);

/**
 * upgrade a release
 */
helm.upgrade('nginx', 'bitnami/nginx');

/**
 * rollback a release
 */
helm.rollback('nginx', 1);

/**
 * list releases
 */
helm.list();

/**
 * list release history
 */
helm.history('nginx');

/**
 * uninstall release
 */
helm.uninstall('nginx');
```

## License

  [MIT](LICENSE)
