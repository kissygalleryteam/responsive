/*
 * grunt-kmc
 * https://github.com/daxingplay/grunt-kmc
 *
 * Copyright (c) 2013 daxingplay
 * Licensed under the MIT license.
 */

'use strict';

var kmc = require('kmc'),
    path = require('path');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('kmc', 'Build KISSY modules.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(),
            depExt = options.depExt,
            depFilePath = options.depFilePath;

        kmc.config(options);

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            f.src.forEach(function(src){
                var depFile = '',
                    inputSrc = path.resolve(src),
                    outputSrc = path.resolve(String(f.dest));
                if(depExt || depFilePath){
                    depExt = depExt || '.dep';
                    var outputIsDir = grunt.file.isDir(outputSrc) || !/\.j$/.test(outputSrc);
                    if(depFilePath){
                        depFile = grunt.file.isDir(depFilePath) ? path.resolve(depFilePath, path.basename(outputIsDir ? path.basename(inputSrc, '.js') :outputSrc) + depExt + '.js') : depFilePath;
                    }else{
                        var dir = outputIsDir ? outputSrc : path.dirname(outputSrc);
                        depFile = path.resolve(dir, path.basename(inputSrc, '.js') + depExt + '.js');
                    }
                }
                var result = kmc.build(inputSrc, outputSrc, '', depFile);

                // Print a success message.
                grunt.log.writeln('File "' + result.files[0].outputFile + '" created.');
            });
        });
    });

};
