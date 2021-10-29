const express = require("express");
const { Op } = require('sequelize');
const router = express.Router();
const TipoDespesa = require("../models/TipoDespesa");
const Receita = require("../models/Receita");
const formatData = require("../functions/formatData");

router.post("/receita", (req, res)=>{
    let data = req.body;
    
    if(data.titulo == null || data.valor == null || data.data == null){
        const response = {
            status: 400,
            mensagem: 'Verifique os dados.'
        }
        res.send(response);
    }else{
        let dataFormatada = formatData(data.data);
        
        Receita.create({
            titulo: data.titulo,
            valor: data.valor,
            descricao: data.descricao,
            data: dataFormatada,
            tiporeceitaId: data.tiporeceitaId
        }).then(()=>{
            const response = {
                status: 200,
                mensagem: 'Receita inserida com sucesso!'
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

router.put("/receita/:id", (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    Receita.findByPk(id).then(receita => {
        if(receita){
            let dataFormatada = formatData(data.data);

            Receita.update({
                titulo: data.titulo,
                valor: data.valor,
                descricao: data.descricao,
                data: dataFormatada,
                tiporeceitaId: data.tiporeceitaId
            },{
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Receita atualizada!'
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

router.get("/receita", (req, res)=>{
    Receita.findAll().then(receitas =>{
        const response = {
            status: 200,
            obj: receitas
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

router.delete("/receita/:id", (req, res) => {
    let id = req.params.id;

    Receita.findByPk(id).then(receita => {
        if(receita){
            Receita.destroy({
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Receita excluida!'
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

router.get("/receita/tipo/:id", (req, res)=>{
    let id = req.params.id;

    TipoDespesa.findByPk(id).then(tipoDespesa => {
        if(tipoDespesa){
            Receita.findAll({
                where: {tiporeceitaId: id}
            }).then(receitas =>{
                const response = {
                    status: 200,
                    obj: receitas
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
                mensagem: 'Id de Tipo Receita inválido'
            }
            res.send(response);
        }
    });
});

router.get("/receita/data", (req, res)=>{
    let data = req.body;
    let dataInicialFormatada = formatData(data.dataInicial);
    let dataFinalFormatada = formatData(data.dataFinal);
    Receita.findAll({
        where : {"data" : {[Op.between] : [ dataInicialFormatada, dataFinalFormatada ]}}
    }).then(receitas =>{
        const response = {
            status: 200,
            obj: receitas
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