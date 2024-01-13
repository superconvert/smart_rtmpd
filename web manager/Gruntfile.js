module.exports = function(grunt) {
  //项目配置
  grunt.initConfig({
    //获取package.json信息
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      target1: {
        files:{
	  'build/server.min.js':['src/server.js']
        }
      }
    }
  });
  //加载uglify插件任务
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // 在输入grunt命令时需要做什么任务，注意先后顺序,在grunt命令执行时，立即执行uglify插件
  grunt.registerTask('default', ['uglify']);
};
