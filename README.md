# Logger

Logger is a Meteor package that provides a simple way to log messages in a collection and display them in the console.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SS78MUMW8AH4N)

## Installation

To install the package, execute this command in the root of your project :
```
meteor add jalik:logger
```

If later you want to remove the package :
```
meteor remove jalik:logger
```

## Configuration

All settings are defined using the `Logger.Config` object.

```js
import {Logger} from 'meteor/jalik:logger';
import {LoggerConfig} from 'meteor/jalik:logger';

Logger.config = new LoggerConfig({
    display: {
        debug: true,
        error: true,
        info: true,
        warning: true
    },
    displayContext: false,
    save: {
        debug: false,
        error: true,
        info: true,
        warning: true
    }
});
```

## Logging messages

There are several methods to log a message depending of its type, note that each of this methods accepts an optional context object as the second argument.

```js
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Logger} from 'meteor/jalik:logger';

const Posts = new Mongo.Collection(null);

const post = {text: "This is my ass !"};

if (post.text.indexOf('ass') !== -1) {
    Logger.warn('The post contains very bad words !', post);
}

Posts.insert(post, function(err, postId) {
    if (err) {
        Logger.error('Post insertion failed', err, Meteor.userId());
    } else {
        Logger.info('Post has been created', post);
        Logger.debug(`Post._id = ${postId}`);
    }
});
```

## Fetching logs

The logs collection is accessible in `Logger.logs`.

```js
// Get debug messages
Logger.logs.find({type: Logger.DEBUG});
// Get error messages
Logger.logs.find({type: Logger.ERROR});
// Get information messages
Logger.logs.find({type: Logger.INFO});
// Get warning messages
Logger.logs.find({type: Logger.WARNING});
```

## Changelog

### v0.2.0
- Uses ES6 module `import` and `export` syntax
- Adds `stack` attribute to context of `Logger.error()` if first argument is an `Error`
- Adds optional `userId` as the 3rd argument of all log methods
- Adds `Logger.config.displayContext` option to display or not the context in the console

## License

This project is released under the [MIT License](http://www.opensource.org/licenses/MIT).
