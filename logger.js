/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {_} from 'meteor/underscore';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Config} from './logger-config';
import {Logs} from './logger-collection';


export const Logger = {

    /**
     * Logger configuration
     * @type {Config}
     */
    config: new Config(),

    /**
     * Logger collection
     * @type {Mongo.Collection}
     */
    logs: Logs,

    /**
     * Debug type
     */
    DEBUG: 'debug',

    /**
     * Error type
     */
    ERROR: 'error',

    /**
     * Information type
     */
    INFO: 'info',

    /**
     * Warning type
     */
    WARNING: 'warning',

    /**
     * Logs a debug message
     * @param message
     * @param context
     * @param userId
     * @return {*}
     */
    debug(message, context, userId) {
        return this.log(message, this.DEBUG, context, userId);
    },

    /**
     * Logs an error message
     * @param error
     * @param context
     * @param userId
     * @return {*}
     */
    error(error, context, userId) {
        context = _.extend({}, context);

        if (typeof error === 'string') {
            return this.log(error, this.ERROR, context, userId);
        }
        else if (error instanceof Error) {
            context.stack = error.stack;
            return this.log(error.message, this.ERROR, context, userId);
        }
    },

    /**
     * Logs an information message
     * @param message
     * @param context
     * @param userId
     * @return {*}
     */
    info(message, context, userId) {
        return this.log(message, this.INFO, context, userId);
    },

    /**
     * Logs a message
     * @param message
     * @param type
     * @param context
     * @param userId
     * @return {*}
     */
    log(message, type, context, userId) {
        if (typeof message !== 'string') {
            throw new TypeError('Logger.log() message is not a String');
        }
        if (type && typeof type !== 'string') {
            throw new TypeError('Logger.log() type is not a String');
        }
        if (context && typeof context !== 'object') {
            throw new TypeError('Logger.log() context is not an Object');
        }
        if (userId && typeof userId !== 'string') {
            throw new TypeError('Logger.log() userId is not a String');
        }

        const config = this.config;

        // Display message in the console
        if (typeof console === 'object' && console) {
            if (config.display === true || config.display[type] === true) {
                let args = [message];

                // Display context in the console
                if (config.displayContext === true) {
                    args.push(context);
                }

                switch (type) {
                    case this.DEBUG:
                        if (typeof console.debug !== 'function') {
                            console.debug = console.log;
                        }
                        console.debug.apply(this, args);
                        break;

                    case this.ERROR:
                        console.error.apply(this, args);
                        break;

                    case this.INFO:
                        console.info.apply(this, args);
                        break;

                    case this.WARNING:
                        console.warn.apply(this, args);
                        break;

                    default:
                        console.log.apply(this, args);
                }
            }
        }

        // Save message in database
        if (config.save === true || config.save[type] === true) {
            return Logs.insert({
                createdAt: new Date(),
                message: message,
                type: type,
                context: context,
                userId: userId
            });
        }
    },

    /**
     * Logs a warning message
     * @param message
     * @param context
     * @param userId
     * @return {*}
     */
    warn(message, context, userId) {
        return this.log(message, this.WARNING, context, userId);
    }
};

export const LoggerConfig = Config;
export default Logger;

if (Meteor.isServer) {
    // Expose the module globally
    if (typeof global !== 'undefined') {
        global['Logger'] = Logger;
    }
}
else if (Meteor.isClient) {
    // Expose the module globally
    if (typeof window !== 'undefined') {
        window.Logger = Logger;
    }
}
