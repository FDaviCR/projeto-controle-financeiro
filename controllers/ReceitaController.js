const express = require("express");
const router = express.Router();
const TipoReceita = require("../models/TipoReceita");

router.post("/tipoReceita", (req, res)=>{
    let data = req.body;
    
    if(data.titulo == undefined || data.titulo == '' || data.titulo == null || data.titulo == {}){
        const response = {
            status: 400,
            mensagem: 'Insira um titulo para o tipo de receita.'
        }
        res.send(response);
    }else{
        TipoReceita.create({
            titulo: data.titulo
        }).then(()=>{
            const response = {
                status: 200,
                mensagem: 'Tipo de receita inserida com sucesso!'
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

router.put("/tipoReceita/:id", (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    TipoReceita.findByPk(id).then(receita => {
        if(receita){
            TipoReceita.update({
                titulo: data.titulo
            },{
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Tipo de receita atualizado!'
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

router.get("/tipoReceita", (req, res)=>{
    TipoReceita.findAll().then(TipoReceitas =>{
        const response = {
            status: 200,
            obj: TipoReceitas
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

router.delete("/tipoReceita/:id", (req, res) => {
    let id = req.params.id;

    TipoReceita.findByPk(id).then(receita => {
        if(receita){
            TipoReceita.destroy({
                where: {id: id}
            }).then(()=>{
                const response = {
                    status: 200,
                    mensagem: 'Tipo de receita excluido!'
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