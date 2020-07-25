const path =require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output:{
        filename:'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    },
    devServer: {
        port:3000,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'

        }),
        new CleanWebpackPlugin(),
    
        new CopyPlugin({
          patterns: [
            {
               from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'docs'),
           },
           
          ],
        }),                                      
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}