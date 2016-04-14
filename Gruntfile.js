module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: grunt.file.readJSON("config.json")
  });

  var instances = grunt.option("id") || grunt.config.get("config.id");
  var region = grunt.option("region") || grunt.config.get("config.region");

  grunt.config("copy.modules", {
      expand: true,
      src: ["node_modules/**", "package.json"],
      dest: "target/gen/"
  });

  grunt.config("copy.starter", {
      src: "index.ejs",
      dest: "target/gen/index.js",
      options: {
        process: function(content, path) {
          return grunt.template.process(content, {
            data: {
              id: instances,
              region: region,
              starter: true
            }
          });
        }
      }
  });

  grunt.config("compress.starter", {
    options: {
      archive: "target/starter.zip",
      mode: "zip"
    },
    files: [{src: ["**/*"], dest: "/", expand: true, cwd: "target/gen"}]
  });

  grunt.config("copy.stopper", {
      src: "index.ejs",
      dest: "target/gen/index.js",
      options: {
        process: function(content, path) {
          return grunt.template.process(content, {
            data: {
              id: instances,
              region: region,
              starter: false
            }
          });
        }
      }
  });

  grunt.config("compress.stopper", {
    options: {
      archive: "target/stopper.zip",
      mode: "zip"
    },
    files: [{src: ["**/*"], dest: "/", expand: true, cwd: "target/gen"}]
  });

  grunt.config("clean.generated", ["target/gen"]);


  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("build", ["copy:modules", "copy:starter", "compress:starter", "copy:stopper", "compress:stopper", "clean:generated"]);
};
