module.exports = function(grunt) {

	// Load necessary task plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Task list
	var tasks = ['compass'];

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: [
				'Gruntfile.js',
				'../css/**/*.css',
				'../scss/**/*.scss'
				],
				tasks: tasks,
				options: {
					spawn: false
				}
			}
		},
		compass: {
			dev: { 
				options: { 
					sassDir: '../scss',
					cssDir: '../css',
					environment: 'development',
					noLineComments:true,
					//outputStyle:'compressed',
					quiet:false,
					trace:true
				}
			}
		}
	});

	// Default task(s). Run all tasks from the task list first, then run the watch task.
	grunt.registerTask('default', tasks.concat(['watch']));
};
