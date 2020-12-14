// webpack.common.js
const path = require('path');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//生成htmlWebpackPlugin的配置
const getHtmlConfig = (name,title)=>({
    template: './src/view/'+name+'.html',//模板文件
    filename: name+'.html',//输出的文件名
    hash: true,//给生成的文件添加一个唯一的hash
    title: title,
    chunks: ['common', name]//需要包含的入口中的chunk
})
module.exports = {
    entry: { //对象写法指定需要打包的入口文件
        //chunk名称:入口文件路径
        'common'            :'./src/pages/common/index.js',
        'index'             :'./src/pages/index/index.js',
        'list'              :'./src/pages/list/index.js',
    },
    output: {
        filename: 'js/[name]-[chunkhash].bundle.js',//指定打包后的文件名称,不用带路径
        publicPath: '/',//指定输出参考根路径
        path: path.resolve(__dirname, 'dist')//指定打包后文件的存放位置,用绝对路径
    },
    resolve: {
        alias: {
            pages: path.resolve(__dirname, 'src/pages/'),
            util: path.resolve(__dirname, 'src/util/'),
            api: path.resolve(__dirname, 'src/api/'),
        }
    },    
    module:{
        //配置loader
        rules: [
            // 处理css的loader
            {
                test: /\.css$/,
                use:[
                    //'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    'css-loader'
                ]
            },
            //处理图片 
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 //当图片大小超过limit值后,会生成一个文件,否则生成Data URL
                        }
                    }
                ]
            },
            //babel处理ES6
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'stage-3']
                    }
                }
            },
            //处理antd的主题
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, 
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, 
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, 'src/pages/common/them.less'),
                                path.resolve(__dirname, 'src/pages/common/iconfont.css'),
                            ] 
                        }
                    }
                ],
            }           
        ]
    },
    plugins:[
        new htmlWebpackPlugin(getHtmlConfig('index','首页')),
        new htmlWebpackPlugin(getHtmlConfig('list', '列表页')),      
        new MiniCssExtractPlugin({
            filename:'css/[name].[fullhash].css'//使用模版指定输出的css文件的位置和文件名称,模版和出口的模版一致
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin()
    ]
};