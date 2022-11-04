const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    // 指定webpack的打包模式, 有两种: development(开发模式) 和 production(生产模式)
    mode: 'none',
    // 开发模式下，建议修改为此设置
    // devtool: 'runtime-compiler',
    // mpde:'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'js/bundle.js', // 输出文件的名称,同时把生成的js文件放到dist目录下的js文件夹中
        path: path.join(__dirname, 'dist'), // 输出文件的存放目录
        clean: true
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },

    // 添加插件选项
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板文件的路径
            filename: 'app.html' // 指定要生成的文件
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        // 首次打包成功后，自动打开浏览器
        open: true,
        port: 80,
        host: 'localhost'
    },
    module: {
        rules: [{
            test: /\.(css|less)$/i,
            use: ["style-loader", "css-loader",'lees-loader'],
        },{
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 21000, // 用来限制图片的大小
                    outputPath: 'images' // 明确把图片保存到dist目录下的images文件夹下
                },
            }],
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules' // 必须指定排除项,因为该目录下的第三方js的高级用法不用被打包
        }],
    }
}