const express = require("express");
const router = express.Router();
const TipoDespesa = require("../models/TipoDespesa");

router.post("/tipoDespesa", (req, res)=>{
    let data = req.body;
    
    if(data.titulo == undefined || data.titulo == '' || data.titulo == null || data.titulo == {}){
        const response = {
            status: 400,
            mensagem: 'Insira um titulo para o tipo de despesa.'
        }
        res.send(response);
    }else{
        TipoDespesa.create({
            titulo: data.titulo
        }).then(()=>{
            const response = {
                status: 200,
                mensagem: 'Tipo de despesa inserida com sucesso!'
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

router.put("/tipoDespesa/:id", (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    TipoDespesa.findByPk(id).then(despesa => {
        if(despesa){
            TipoDespesa.update({
                titulo: data.titulo
            },{
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Tipo de despesa atualizado!'
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

router.get("/tipoDespesa", (req, res)=>{
    TipoDespesa.findAll().then(tipoDespesas =>{
        const response = {
            status: 200,
            obj: tipoDespesas
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

router.delete("/tipoDespesa/:id", (req, res) => {
    let id = req.params.id;

    TipoDespesa.findByPk(id).then(despesa => {
        if(despesa){
            TipoDespesa.destroy({
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Tipo de despesa excluido!'
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

module.exports = router;