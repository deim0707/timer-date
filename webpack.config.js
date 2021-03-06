const path = require('path');


module.exports = {
    //указывает, например в девтулс, правильную ссылка на исходник кода
    devtool: 'source-map',
    //точка входа
    entry: './src/index.js',
    //куда компилируем итог
    output: {
        //куда положим итоговый файл
        path: path.join(__dirname, 'dist'),
        //его название
        filename: 'main.js',
        //для статичныйх файлов. препроцессоров, картинок ...
        publicPath: '/dist/'
    },
    //подключаем модули к вебпаку. тут же описыаются правила для них
    module: {
        rules: [
            {
                //те типы файлов, для которых срабатывают эти правила. в виде регулярки задаём
                test: /\.js/,
                //тут лоадеры? минимизатор?, бабелЛоадер
                use:[
                    {
                        loader: 'babel-loader',
                        //настройки для конкретного лоадера: //тут так же могли бы указать пресет для реакта внутри массива
                        options: { presets: ["env"]  }
                    }
                ]
            }
        ]
    }

}