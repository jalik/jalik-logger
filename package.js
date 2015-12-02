Package.describe({
    name: 'jalik:logger',
    version: '0.1.0',
    author: 'karl.stein.pro@gmail.com',
    summary: 'Logger utility',
    homepage: 'https://github.com/jalik/jalik-logger',
    git: 'https://github.com/jalik/jalik-logger.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('check@1.0.6');
    api.use('mongo@1.1.2');
    api.use('underscore');

    api.addFiles('logger.js');
    api.addFiles('logger-config.js');

    api.export('Logger');
});
