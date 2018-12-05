const fs = require('fs');
const path = require('path');

//carrega todos os arquivos de rotas do diretorio routes e exporta tudo em um arquivo só
module.exports = app => {
    fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "routes.js")))
    .forEach(file => require(path.resolve(__dirname, file))(app));
}