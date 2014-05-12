/*
 * grunt-hockeyapp
 * https://github.com/aszmyd/grunt-hockeyapp
 *
 * Copyright (c) 2014 Adam Szmyd
 * Licensed under the MIT license.
 */

'use strict';

var which = require('which'),
    cp = require('child_process'),
    sys = require('sys');

module.exports = function (grunt) {

    var log = grunt.log;
    
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('hockeyapp', 'The best Grunt plugin ever.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            token: null,
            app_id: null,
            file: null,
            notes: 'New release',
            notify: 2, // Notify all
            download: true,
            tags: ''
        });

        try {
            which.sync('ruby');
        } catch (err) {
            return grunt.warn(
                '\nYou need to have Ruby installed and in your PATH for this task to work.'
            );
        }
        
        if(options['token'] === null) {
	    return grunt.warn(
                'Token option is required!'
            );
	} else if(options['app_id'] === null) {
	    return grunt.warn(
                'Application id option is required!'
            );
	} else if(options['file'] === null) {
	    return grunt.warn(
                'File path is required!'
            );
	}
        
	var rubyfile = __dirname + '/../ruby/hockeyapp.rb';
	
	var status = 2; // default - allow to download
	if(!options['download']) {
	  status = 1; // dont allow users to download
	}
        var args = [
             '--token="'+options['token']+'"',
             '--app_id="'+options['app_id']+'"',
             '--file="'+options['file']+'"',
             '--notes="'+options['notes']+'"',
             '--status="'+status+'"',
             '--notify="'+options['notify']+'"',
             '--tags="'+options['tags']+'"'
        ];
	var command = 'ruby ' + rubyfile + ' ' + args.join(' ');
		
	var done = this.async();
	
	grunt.log.subhead('Uploading file "'+options['file']+'" ... ');
	
	cp.exec(command, args, function(error, stdout, stderr) {
	  if(error === null) {
	    grunt.log.write(stdout);
	    grunt.log.ok('  Uploaded "' + options['file'] + '"');
	    done();
	  } else {
	    grunt.log.error(stderr);
	    grunt.log.error('  Error uploading file "' + options['file'] + '"');
	    done(false);
	  }
	});
	
	
    });

};
