let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/react-leaderboard.js', 'public/js/react-leaderboard.js')
    .react('resources/assets/js/react-search.js', 'public/js/react-search.js')    
    .js('resources/assets/js/game.js', 'public/js')
    .js('resources/assets/js/app.js', 'public/js')    
    .copyDirectory('resources/assets/js/games', 'public/js/games')
    .styles('resources/assets/css/app.css', 'public/css/app.css')
    .sass('resources/assets/sass/startPageAnimation.scss', 'public/css');