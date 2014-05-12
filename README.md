# grunt-hockeyapp

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hockeyapp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hockeyapp');
```
## Requirement vendor libraries
This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/) and this [HockeyApp gem](https://github.com/tapptic/hockeyapp/). If you're on OS X or Linux you probably already have Ruby installed; test with ruby -v in your terminal. When you've confirmed you have Ruby installed, run `gem update --system && gem install hockeyapp` to install HockeyApp gem.

## The "hockeyapp" task

### Overview
In your project's Gruntfile, add a section named `hockeyapp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  /**
   * Hockeyapp integration
   */
  hockeyapp: {
    /**
     * Global options
     */
    options: {
        notes: 'New release note',
        tags: 'Tag1,Tag2', // comma-separated list of tags
        download: true, // Enable/Disable download
        notify: 0 // 0 - Don't notify, 1 - Notify all that can install this app, 2 - Notify all
    },
    /**
     * App-specific options
     */
    Android: {
        options: {
            token: 'ABCDE', // Upload Token
            app_id: 'ABCDE', // Application ID
            download: false, // Disable download of this app
            file: 'android_file.apk' // Path to file
        }
    },
  },
});
```          
            
### Options

#### options.token
Type: `String`

Upload Token from HockeyApp

#### options.app_id
Type: `String`

Application ID from HockeyApp

#### options.file
Type: `String`

Path to file to upload (.ipa, .app.zip or .apk)

#### options.notes
Type: `String`
Default value: `''`

Release notes

#### options.notify
Type: `Integer`
Default value: `2`

Notification:
  `0` - Don't notify, 
  `1` - Notify all that can install this app, 
  `2` - Notify all

#### options.download
Type: `Boolean`
Default value: `true`

Download status (can only be set with full-access tokens):
  `false`: Don't allow users to download or install the version
  `true`: Available for download or installation
  
#### options.tags
Type: `String`
Default value: `''`

Restrict download to comma-separated list of tags

## Release History
_(Nothing yet)_
