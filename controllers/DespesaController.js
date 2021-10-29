const express = require("express");
const { Op } = require('sequelize');
const router = express.Router();
const TipoDespesa = require("../models/TipoDespesa");
const Despesa = require("../models/Despesa");
const formatData = require("../functions/formatData");

router.post("/despesa", (req, res)=>{
    let data = req.body;
    
    if(data.titulo == null || data.valor == null || data.data == null){
        const response = {
            status: 400,
            mensagem: 'Verifique os dados.'
        }
        res.send(response);
    }else{
        let dataFormatada = formatData(data.data);
        
        Despesa.create({
            titulo: data.titulo,
            valor: data.valor,
            descricao: data.descricao,
            data: dataFormatada,
            tipodespesaId: data.tipodespesaId
        }).then(()=>{
            const response = {
                status: 200,
                mensagem: 'Despesa inserida com sucesso!'
            }
            res.send(response);
        }).catch(err =>{
            const response = {
                status: 400,
                erro: err
            }
            res.send(response);
        })
    }
});

router.put("/despesa/:id", (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    Despesa.findByPk(id).then(despesa => {
        if(despesa){
            let dataFormatada = formatData(data.data);

            Despesa.update({
                titulo: data.titulo,
                valor: data.valor,
                descricao: data.descricao,
                data: dataFormatada,
                tipodespesaId: data.tipodespesaId
            },{
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Despesa atualizada!'
                }
                res.send(response);
            }).catch(err =>{
                const response = {
                    status: 400,
                    erro: err
                }
                res.send(response);
            })
        }else{
            const response = {
                status: 400,
                mensagem: 'Id inválido'
            }
            res.send(response);
        }
    });
});

router.get("/despesa", (req, res)=>{
    Despesa.findAll().then(despesas =>{
        const response = {
            status: 200,
            obj: despesas
        }
        res.send(response);
    }).catch(err =>{
        const response = {
            status: 400,
            erro: err
        }
        res.send(response);
    });
});

router.delete("/despesa/:id", (req, res) => {
    let id = req.params.id;

    Despesa.findByPk(id).then(despesa => {
        if(despesa){
            Despesa.destroy({
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Despesa excluida!'
                }
                res.send(response);
            }).catch(err =>{
                const response = {
                    status: 400,
                    erro: err
                }
                res.send(response);
            })
        }else{
            const response = {
                status: 400,
                mensagem: 'Id inválido'
            }
            res.send(response);
        }
    });
});

router.get("/despesa/tipo/:id", (req, res)=>{
    let id = req.params.id;

    TipoDespesa.findByPk(id).then(tipoDespesa => {
        if(tipoDespesa){
            Despesa.findAll({
                where: {tipodespesaId: id}
            }).then(despesas =>{
                const response = {
                    status: 200,
                    obj: despesas
                }
                res.send(response);
            }).catch(err =>{
                const response = {
                    status: 400,
                    erro: err
                }
                res.send(response);
            });
        }else{
            const response = {
                status: 400,
                mensagem: 'Id de Tipo Despesa inválido'
            }
            res.send(response);
        }
    });
});

router.get("/despesa/data", (req, res)=>{
    let data = req.body;
    let dataInicialFormatada = formatData(data.dataInicial);
    let dataFinalFormatada = formatData(data.dataFinal);
    Despesa.findAll({
        where : {"data" : {[Op.between] : [ dataInicialFormatada, dataFinalFormatada ]}}
    }).then(despesas =>{
        const response = {
            status: 200,
            obj: despesas
        }
        res.send(response);
    }).catch(err =>{
        const response = {
            status: 400,
            erro: err
        }
        res.send(response);
    });
});

module.exports = router;