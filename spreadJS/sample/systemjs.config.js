(function (global) {
    System.config({
        transpiler: 'plugin-babel',
        babelOptions: {
            es2015: true,
            react: true
        },
        meta: {
            '*.css': { loader: 'css' }
        },
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            '@grapecity/spread-sheets': 'npm:@grapecity/spread-sheets/index.js',
            '@grapecity/spread-sheets-charts': 'npm:@grapecity/spread-sheets-charts/index.js',
            '@grapecity/spread-sheets-shapes': 'npm:@grapecity/spread-sheets-shapes/index.js',
            '@grapecity/spread-sheets-react': 'npm:@grapecity/spread-sheets-react/index.js',
            '@grapecity/jsob-test-dependency-package/react-components': 'npm:@grapecity/jsob-test-dependency-package/react-components/index.js',
            'react': 'npm:react/umd/react.production.min.js',
            'react-dom': 'npm:react-dom/umd/react-dom.production.min.js',
            'css': 'npm:systemjs-plugin-css/css.js',
            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build':'npm:systemjs-plugin-babel/systemjs-babel-browser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            src: {
                defaultExtension: 'jsx'
            },
            "node_modules": {
                defaultExtension: 'js'
            },
        }
    });
})(this);
