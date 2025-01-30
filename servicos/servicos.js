import historicoInflacao from '../dados/dados.js';

export const buscarIPCA = () => {
    return historicoInflacao;
};

export const buscaPorAno = (ano) => {
    return historicoInflacao.filter(anoIPCA => anoIPCA.ano === ano)
};

export const buscarPorId = (id) => {
    const idIPCA = parseInt(id)
    return historicoInflacao.find(ipca => ipca.id === idIPCA)
};

export const calculoIPCA = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    
    const arrayIPCA = historicoInflacao.filter(({mes, ano}) => {
        const inicio = anoInicial * 12 + mesInicial;
        const atual = ano * 12 + mes;
        const final = anoFinal * 12 + mesFinal;

        return atual >= inicio && atual <= final;
    })

    let resultadoFinal = valor
    
    for (let i = 0; i < arrayIPCA.length; i++){
        resultadoFinal = resultadoFinal * (1 + (arrayIPCA[i].ipca / 100));
    }

    return resultadoFinal;
}

export const validaData = (mesInicial, anoInicial, mesFinal, anoFinal) => {
    const periodoInicial = anoInicial * 12 + mesInicial;
    const periodoFinal = anoFinal * 12 + mesFinal;

    if (periodoFinal < periodoInicial) {
        return true;
    } else {
        return false;
    }
}