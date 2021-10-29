const Sequelize = require("sequelize");
const connection = require("../database/database");

const TipoReceita = connection.define('tiporeceitas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

TipoReceita.sync({force:false});

module.exports = TipoReceita;