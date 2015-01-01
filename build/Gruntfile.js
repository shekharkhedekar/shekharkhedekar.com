module.exports = function (grunt) {

    // Load necessary task plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mustache-render');

    // Task list
    var tasks = ['compass', 'concat', 'uglify', 'mustache_render'];

    // Configuration
    grunt.initConfig({
        pkg:             grunt.file.readJSON('package.json'),
        watch:           {
            scripts: {
                files:   [
                    'Gruntfile.js',
                    '../scss/**/*.scss',
                    '../js/**/*.js',
                    '../json/*.json',
                    '../index.mustache'
                ],
                tasks:   tasks,
                options: {
                    spawn: false
                }
            }
        },
        compass:         {
            dev: {
                options: {
                    sassDir:        '../scss',
                    cssDir:         '../www',
                    environment:    'development',
                    noLineComments: true,
                    outputStyle:    'compressed',
                    quiet:          false,
                    trace:          true
                }
            }
        },
        concat:          {
            options: {},
            dist:    {
                src:  ['../js/lib/*.js', '../js/scripts.js'],
                dest: '../www/scripts.js'
            }
        },
        uglify:          {
            options: {
                //mangle: false
            },
            prod:    {
                files: {
                    '../www/scripts.min.js': ['../www/scripts.js']
                }
            }
        },
        mustache_render: {
            options: {
                "escape": false
            },
            prod:    {
                options: {
                    // Target specific options go here
                },
                files:   [
                    {
                        data:     '../json/data.json',
                        template: '../index.mustache',
                        dest:     '../www/index.html'
                    }
                ]
            }
        }
    });

    // Default task(s). Run all tasks from the task list first, then run the watch task.
    grunt.registerTask('default', tasks.concat(['watch']));
};
