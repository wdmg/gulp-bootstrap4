# Gulp Bootstrap4
A starter Gulp project that includes automation of build tasks for Bootstrap4.

Project contain all the necessary inclusions for generating Bootstrap4 theme, including custom variables, mixins, and components.

## Environmental requirements
To create an environment, you must have the following tools installed:

1. [Node.js](https://nodejs.org)
2. [Git](https://git-scm.com)
3. [Gulp](https://gulpjs.com)

If you do not have these tools, you need to install them.

## How to use
1. Clone the Gulp Bootstrap4 repository with GitHub: `git clone https://github.com/wdmg/gulp-bootstrap4.git`
2. Change to the directory where you cloned, for example: `cd gulp-bootstrap4`
3. Run the command to install the dependencies: `npm i`
4. And run the first build of the project: `gulp`

## What is included
* [browser-sync](https://browsersync.io/docs/gulp) // Local web server for LiveReload development
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) // To build and compile SCSS in CSS
* [gulp-cache](https://www.npmjs.com/package/gulp-cache) // Caching plugin (used for image compression)
* [gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf) // To clear the build directory
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) // To track errors and display the terminal console
* [gulp-rigger](https://www.npmjs.com/package/gulp-rigger) // For quick import of JS, SCSS and HTML just from code
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) // To rename files and directories
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) // Creates a file map for JS scripts and CSS styles
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) // Adds CSS prefixes for [Can I Use](https://caniuse.com/)
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) // To minimize CSS styles
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) // To minimize JS scripts
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) // To compress images
* [imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress) // JPEG image compression plugin
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) // PNG image compression plugin

## Gulp tasks
`default` (as also include tasks `build`, `watch`)
`build` (as also include tasks `clean`, `build:html`, `build:js`, `build:css`, `build:fonts`, `build:images`)
`watch` (as also include tasks `build:html`, `build:js`, `build:css`, `build:fonts`, `build:images`)

## Gulp configuration
It is presented in the form of several `paths` objects, which contains information about the location of files and directories needed to build the project and `config`, which defines the main parameters of the assembly.
The paths object contains the path configuration for the tasks `build`, `src`, `watch`, `clean`.
The `config` object contains the configuration for the modules` gulp-autoprefixer`, `gulp-imagemin`,` browser-sync` and `gulp-cache`.