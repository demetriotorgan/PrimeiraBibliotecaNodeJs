import chalk from "chalk";
//para executar no temrinal: npm run cli:valida

function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) =>Object.values(objetoLink).join())
}

async function checaStatus(listaURLs){
    const arrStatus = await Promise
    .all(
        listaURLs.map(async (URLs)=>{
            try {
                const response = await fetch(URLs)
                return `${response.status} - ${response.statusText}`; //complementa a resposta do status code alem do codigo                
            } catch (error) {
                return manejaErros(error)
            }
       })
    )
    return arrStatus;
}

function manejaErros(erro){
    //console.log(chalk.red('Algo deu errado'), erro)
        if (erro.cause.code === 'ENOTFOUND'){
            return 'Link não encontrado'
        } else {
            return 'Ocorreu algum erro'
        }
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    // console.log(status);
    return listaDeLinks.map((objeto, indice)=>({
        ...objeto, 
        status: status[indice]
    }))
}