"use strict";

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require("jit-grunt")(grunt, {
        buildcontrol: "grunt-build-control"
    });
    require("time-grunt")(grunt); // Time how long tasks take. Can help when optimizing build times

    var 
        pkg = grunt.file.readJSON("package.json"),

        paths = {
            src: "src",
            build: "dist",
            temp: ".temp",
            test: "test"
        },

        options = {
            dev: grunt.option("dev")
        };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: paths,

        ts: {
            options: {
                fast: "never",
                target: "es3",
                module: "umd",
                sourceMap: false,
                declaration: false,
                comments: true
            },
            dev: {
                src: "<%= paths.src %>/**/*.ts",
                options: {
                    sourceMap: true
                }
            },
            test: {
                src: "<%= paths.test %>/**/*.ts"
            },
            dist: {
                src: "<%= paths.src %>/**/*.ts",
                outDir: "<%= paths.build %>",
                options: {
                    declaration: true,
                    rootDir: "<%= paths.src %>"
                }
            },
            distes: {
                src: "<%= paths.src %>/**/*.ts",
                outDir: "<%= paths.build %>/es",
                options: {
                    target: "es6",
                    module: "es6",
                    declaration: false,
                    rootDir: "<%= paths.src %>"
                }
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            dev: {
                src: "<%= paths.src %>/**/*.ts"
            },
            test: {
                src: "<%= paths.test %>/**/*.ts"
            }
        },

        buildcontrol: {
            options: {
                dir: "<%= paths.build %>",
                commit: true,
                push: true,
                branch: "release"
            },
            publish: {
                options: {
                    tag: pkg.version,
                    remote: pkg.repository.url,
                    message: "Publish %sourceName% '" + pkg.version + "' from commit %sourceCommit% on branch %sourceBranch%"
                }
            }
        },
        
        clean: {
            dev: [
                "<%= paths.src %>/**/*.d.ts",
                "!<%= paths.src %>/math.d.ts",
                "<%= paths.src %>/**/*.js",
                "<%= paths.src %>/**/*.js.map"
            ],
            dist: "<%= paths.build %>",
            build: "<%= paths.build %>/.baseDir.*"
        }
    });

    grunt.registerTask("packages", function() {
        var pkg = grunt.file.readJSON("package.json");

        delete pkg.devDependencies;
        delete pkg.scripts;

        grunt.file.write(paths.build + "/package.json", JSON.stringify(pkg, null, 2));

        var bower = grunt.file.readJSON("bower.json");
        grunt.file.write(paths.build + "/bower.json", JSON.stringify(bower, null, 2));
    });

    grunt.registerTask("npmpublish", "Publish NPM package", function () {
        const 
            npmBin = /^win/.test(process.platform) ? "npm.cmd" : "npm",
            res = require("child_process").spawnSync(npmBin, ["publish"], { cwd: paths.build });

        if (res.status !== 0) {
            return grunt.fail.warn("An error occured while trying to publish NPM package", res.status);
        }

        grunt.verbose.writeln(res.stdout);
        grunt.log.ok("NPM package successfully published!");
    });

    grunt.registerTask("build", ["clean:dev", "clean:dist", "tslint:dev", "ts:dist", "ts:distes", "packages"]);
    grunt.registerTask("dev", ["clean:dev", "tslint:dev", "ts:dev"]);

    grunt.registerTask("publish", ["build", "clean:build", "buildcontrol:publish", "npmpublish"]);

    grunt.registerTask("default", ["build"]);
};