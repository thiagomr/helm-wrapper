const install = {
    release: {
        type: 'string',
        required: true
    },
    chart: {
        type: 'string',
        required: true
    }
};

const uninstall = {
    release: {
        type: 'string',
        required: true
    }
};

const upgrade = {
    release: {
        type: 'string',
        required: true
    },
    chart: {
        type: 'string',
        required: true
    }
};

const history = {
    release: {
        type: 'string',
        required: true
    }
};

const rollback = {
    release: {
        type: 'string',
        required: true
    },
    revision: {
        type: 'number',
        required: true
    }
};

const repoAdd = {
    repositoryName: {
        type: 'string',
        required: true
    },
    url: {
        type: 'string',
        required: true
    }
};

const custom = {
    name: {
        type: 'string',
        required: true
    }
};

module.exports = {
    install,
    uninstall,
    upgrade,
    history,
    rollback,
    repoAdd,
    custom
};
