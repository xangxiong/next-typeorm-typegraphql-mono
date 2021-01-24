const reflectMetadata = require('reflect-metadata');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules')(
    [

    ]
);
const webpack = require('webpack');
const path = require('path');

module.exports = withPlugins([
        [withOptimizedImages],
        [withSass],
        [withCSS],
        [withTM]
    ], {
        env: {
        
        },
        serverRuntimeConfig: {

        },
        publicRuntimeConfig: {
            
        },
        sassOptions: {

        },
        webpack(config, options) {
            config.resolve.modules.push(path.resolve('./'));
            return config;
        }
});