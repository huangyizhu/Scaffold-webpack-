const rules = [{
        test: /\.art$/,
        use: {
            loader: "art-template-loader",
        },
    }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    }, {
        test: /\.(png|jpg)$/,
        use: {
            loader: 'url-loader',
            options: {
                "limit": "4096",
                "name": "[name].[ext]",
                "outputPath": "img/",
            },
        }
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "file-loader"
        }
    },
    {
        test: /\.(woff|woff2)$/,
        use: {
            loader: 'url-loader',
            options: {
                "limit": "5000",
                "name": "[name].[ext]",
                "outputPath": "font/",
            },
        }
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: 'url-loader',
            options: {
                "limit": "10000",
                "mimetype": "application/octet-stream",
                "name": "[name].[ext]",
                "outputPath": "font/",
            },
        }
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: 'url-loader',
            options: {
                "limit": "10000",
                "mimetype": "image/svg+xml",
                "name": "[name].[ext]",
                "outputPath": "img/",
            },
        }
    }
]

module.exports = {
    "rules": rules
};