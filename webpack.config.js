//En este caso es un proyecto frontend con typescript

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.ts', //archivo base para hacer el bundler
  
  module: { //aca ponemos las distintas "reglas". Cada una va a ser un "loader"
            //encargado de transpilar el codigo de ciertos archivos
    
    rules: [
      { 
        test: /\.ts?$/, //en este caso esta es para typescript
        use: 'ts-loader', //debemos tener previamente instalado el loader
        exclude: /node_modules/,
      }
    ],
  },
  
  resolve: { //que archivos y en que orden deberia tener en cuenta
    extensions: ['.ts', '.js'],

    extensionAlias: { //
      '.js': ['.js', '.ts'],
    }
  },
  
  output: { //como va a ser el output del bundle
    
    filename: 'bundle.js', //nombre del archivo
    path: path.resolve(__dirname, 'dist'), //directorio
  },

  plugins: [ //plugins para añadir funcionalidad extra
    
   new HtmlWebpackPlugin({ //este es para que permita integrar un archivo html
                           //metiendole la importacion del script (resultado del bundler).
        title: 'our project', 
        template: './src/index.html' }) 
   ]

};