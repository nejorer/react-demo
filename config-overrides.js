const { override, fixBabelImports,addWebpackAlias } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addWebpackAlias({
        ["@"]: resolve('src')
    }),
    (config, env) => {
        config = rewireReactHotLoader(config, env)
        return config
    }
);