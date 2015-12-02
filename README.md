# Logger

Logger is a Meteor package that provides a simple way to log messages to the console and in a collection if needed.

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
Logger.config = new Logger.Config({
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
});
```

## Logging messages

There are several methods to log a message depending of its type, note that each of this methods accepts an optional context object as the second argument.

```js
if (containsBadWords(post.text)) {
    Logger.warn('The post contains bad words !', post);
}
Posts.insert(post, function(err, postId) {
    if (err) {
        Logger.error('Post insertion failed', err);
    } else {
        Logger.info('Post has been created');
        Logger.debug('Post._id =', postId);
    }
});
```

## Fetching logs

The logs collection is accessible in `Logger.logs`.

```js
// Get debug messages
var debugs = Logger.logs.find({type: Logger.DEBUG});
// Get error messages
var errors = Logger.logs.find({type: Logger.ERROR});
// Get information messages
var messages = Logger.logs.find({type: Logger.INFO});
// Get warning messages
var warnings = Logger.logs.find({type: Logger.WARNING});
```
