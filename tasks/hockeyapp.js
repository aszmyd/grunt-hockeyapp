/*
 * grunt-hockeyapp
 * https://github.com/aszmyd/grunt-hockeyapp
 *
 * Copyright (c) 2014 Adam Szmyd
 * Licensed under the MIT license.
 */

'use strict';
var which = require('which');
var exec = require('child_process').exec;

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('hockeyapp', 'The best Grunt plugin ever.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        try {
            which.sync('ruby');
        } catch (err) {
            return grunt.warn(
                '\nYou need to have Ruby installed and in your PATH for this task to work.'
            );
        }

        var bin = 'ruby ruby/hockeyapp.rb';
        var args = [
            "ass"

        ];



     //   var childProcess = exec(bin, args);


        exec('ruby ruby/hockeyapp.rb', function(error, stdout, stderr) {
            if (!error) {
                //do something
                console.log("no err");
            } else {
                console.log("err");
            }
        });




        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    // Read file source.
                    return grunt.file.read(filepath);
                }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
