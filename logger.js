/**
 * Logger utility
 */
Logger = {

    /**
     * Logger configuration
     * @type {Logger.Config}
     */
    config: null,

    /**
     * Debug message
     */
    DEBUG: 'debug',

    /**
     * Error message
     */
    ERROR: 'error',

    /**
     * Information message
     */
    INFO: 'info',

    /**
     * Warning message
     */
    WARNING: 'warning',

    /**
     * Logs a debug message
     * @param message
     * @param context
     * @return {*}
     */
    debug: function (message, context) {
        return this.log(message, Logger.DEBUG, context);
    },

    /**
     * Logs an error
     * @param message
     * @param err
     * @return {*}
     */
    error: function (message, err) {
        if (message) {
            if (typeof message === 'string') {
                return this.log(message, Logger.ERROR, err);

            } else if (typeof message === 'object') {
                if (message.message) {
                    return this.log(message.message, Logger.ERROR, message.stack || message.stacktrace);
                }
            }
        }
    },

    /**
     * Logs an information
     * @param message
     * @param context
     * @return {*}
     */
    info: function (message, context) {
        return this.log(message, Logger.INFO, context);
    },

    /**
     * Logs a message
     * @param message
     * @param type
     * @param context
     * @return {any}
     */
    log: function (message, type, context) {
        check(message, String);
        //check(type, String);

        var config = this.config;

        if (console && (config.display === true || config.display[type] === true)) {
            switch (type) {
                case this.DEBUG:
                    console.log(message);
                    break;

                case this.ERROR:
                    console.error(message, context);
                    break;

                case this.INFO:
                    console.info(message);
                    break;

                case this.WARNING:
                    console.warn(message);
                    break;

                default:
                    console.log(message);
            }
        }

        if (config.save === true || config.save[type] === true) {
            return Logger.logs.insert({
                createdAt: new Date(),
                message: message,
                type: type,
                context: context
            });
        }
    },

    /**
     * Logs a warning
     * @param message
     * @param context
     * @return {*}
     */
    warn: function (message, context) {
        return this.log(message, Logger.WARNING, context);
    }
};

/**
 * Logs collection
 * @type {Mongo.Collection}
 */
Logger.logs = new Mongo.Collection('jalik-logs');
