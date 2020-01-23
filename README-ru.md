# Gulp Bootstrap4
Стартовый Gulp-проект, который включает в себя автоматизацию задач сборки для Bootstrap4.

Проект содержит все необходимые включения для генерации Bootstrap4 темы, в том числе кастомные переменные, миксины и компоненты.

## Требования к окружению
Для создания окружения необходимо иметь следующие установленные инструменты:

1. [Node.js](https://nodejs.org)
2. [Git](https://git-scm.com)
3. [Gulp](https://gulpjs.com)

Если у Вас нет данных инструментов - их необходимо установить.

## Как использовать
1. Клонируйте репозиторий Gulp Bootstrap4 с GitHub: `git clone https://github.com/wdmg/gulp-bootstrap4.git`
2. Перейдите в директорию, куда вы произвели клонирование, например: `cd gulp-bootstrap4`
3. Выполните команду для установки зависимостей: `npm i`
4. И запустите первую сборку проекта: `gulp`

## Что включено
* [browser-sync](https://browsersync.io/docs/gulp) // Локальный веб-сервер для LiveReload разработки
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) // Для сборки и компиляции SCSS в CSS
* [gulp-cache](https://www.npmjs.com/package/gulp-cache) // Плагин кеширования (используется при сжатии изображений)
* [gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf) // Для очистки buil-директории
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) // Для отслеживания ошибок и вывода в консоль териминала
* [gulp-rigger](https://www.npmjs.com/package/gulp-rigger) // Для быстрого импорта JS, SCSS и HTML просто из кода
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) // Для переименования файлов и директорий
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) // Создаёт карту файла для JS-скриптов и CSS-стилей
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) // Добавляет CSS-префиксы по [Can I Use](https://caniuse.com/)
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) // Для минимизации CSS-стилей
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) // Для минимизации JS-скриптов
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) // Для сжатия изображений
* [imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress) // Плагин сжатия JPEG-изображений
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) // Плагин сжатия PNG-изображений

## Задания Gulp
`default` (включает такие задания как `build`, `watch`)
`build` (включает такие задания как `clean`, `build:html`, `build:js`, `build:css`, `build:fonts`, `build:images`)
`watch` (включает такие задания как `build:html`, `build:js`, `build:css`, `build:fonts`, `build:images`)

## Конфигурация Gulp
Представлен в виде нескольких объектов `paths`, который содержит сведения о местоположении файлов и директорий необходимых для сборки проекта и `config`, который определяет основные параметры сборки.
Объект `paths` содержит конфигурацию путей для заданий `build`, `src`, `watch`, `clean`.
Объект `config` содержит конфигурацию для модулей `gulp-autoprefixer`, `gulp-imagemin`, `browser-sync` и `gulp-cache`.