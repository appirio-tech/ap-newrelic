# ap-newrelic

* Provides an easy way to include newrelic browser in client side projects already using jade templates
* Provides route render timing for angular apps

## Usage

### Installation

* ```bower install --save git@github.com:appirio-tech/ap-newrelic```
* Or add the following line to your bower.json under dependencies, then ```bower install```
  ```"ap-newrelic": "git@github.com:appirio-tech/ap-newrelic#master"```

### .env

Add the following two variables to the environment (or your .env file) during your application's build step
```
	NEWRELIC_APPLICATION_ID=7xxxxx9
	NEWRELIC_LICENSE_KEY=4xxxxxxxx0
```

You can get your application id and license key by inspecting the last line of the newrelic browser script
that newrelic will offer you immediately after you create a new browser application on their dashboard.

### Include newrelic first stage loader in index.jade

```
html
  head
    ...
    meta(name='viewport', content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
+   include ../../../bower_components/ap-newrelic/browser/script
```

It should be included as near to the top of the head section as possible, immediately after the last
position-sensitive meta tag (this is per newrelic readme ...)

Your application id and license key will be extracted from the environment and included when the jade
template is rendered.

### Include angular route reporting and render timing

* app.module.js
```
  angular.module('app', [
    ...
    'newrelic'
  ]).whatever( ...
```

* index.jade:

Include ```/bower_components/ap-newrelic/ng-route-timing/dist/newrelic``` when you include your angular modules.

Route names and timing will be logged to the console for debugging convenience and reported to newrelic as
custom "routeChange" actions.

## Building
   ```
   git clone
   npm install
   gulp
   ```
