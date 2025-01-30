import express from 'express';
import { buscarIPCA, buscarPorId, buscaPorAno, calculoIPCA, validaData } from './servicos/servicos.js';


const app = express()

app.get ('/historicoIPCA/calculo', (req, res) => {    
    const valor = parseFloat(req.query.valor);
    const mesInicial = parseInt(req.query.mesInicial);
    const anoInicial = parseInt(req.query.anoInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    const anoFinal = parseInt(req.query.anoFinal);
    
    const calculoFinalIPCA = calculoIPCA(valor, mesInicial, anoInicial, mesFinal, anoFinal);


    if(isNaN(mesInicial) || isNaN(anoInicial) || isNaN(mesFinal) || isNaN(anoFinal) || isNaN(valor)){
        res.status(400).send({"erro": "Requisição inválida, por favor coloque um número!"})
    } else if ( mesFinal > 12 || mesFinal < 1 || mesInicial > 12 || mesInicial < 1 ){
        res.status(400).send({"erro": "Coloque um mês válido"})
    } else if ( anoInicial < 2015 || anoInicial > 2023 || anoFinal < 2015 || anoFinal > 2023 ) {
        res.status(400).send({"erro": "Coloque um ano entre 2015 e 2023"})
    } else if (validaData(mesInicial, anoInicial, mesFinal, anoFinal) === true){
        return res.status(400).json({ erro: "A data final não pode ser anterior à data inicial" });
    } else {
    res.json({ resultado: Number(calculoFinalIPCA.toFixed(2)) })
    }

});

app.get ('/historicoIPCA', (req, res) => {
    const ano = parseInt(req.query.ano)
    const resultado = ano ? buscaPorAno(ano) : buscarIPCA();
    
    if(resultado.length > 0){
        res.json(resultado)
    } else {
        res.status(404).send({"erro": "Nenhuma informação para o ano informado"});
    }
});

app.get ('/historicoIPCA/:id', (req, res) => {
    const id = buscarPorId(req.params.id)
    if (id) {
        res.json(id);
    } else if (isNaN(parseInt(id))){
        res.status(400).send({"erro": "Requisição inválida"});
    } else {
        res.status(404).send({"erro": "ID não encontrada"})
    }
});


app.listen(8080, () =>{
    console.log('Servidor iniciado na porta 8080')
})