/**
 * Logger configuration
 * @param options
 * @constructor
 */
Logger.Config = function (options) {
    _.extend(this, {
        display: {
            debug: true,
            error: true,
            info: true,
            warning: true
        },
        save: {
            debug: false,
            error: true,
            info: true,
            warning: true
        }
    }, options);
};

// Set default config
Logger.config = new Logger.Config();
