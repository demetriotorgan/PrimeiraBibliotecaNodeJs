import chalk from 'chalk';
import fs from 'fs';


function extrairLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura =>({[captura[1]]: captura[2]}));
    //console.log(resultados);
    return resultados
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

// //Promisses com .then
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))    
//     .catch(trataErro)
// }

// Promisses com async/ await
async function pegarArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
       console.log(extrairLinks(texto));
    } catch (erro){
        trataErro(erro);
    }
}

pegarArquivo('./arquivos/texto.md');


//Expressoes Regulares
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
