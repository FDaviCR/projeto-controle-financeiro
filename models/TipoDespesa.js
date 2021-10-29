const Sequelize = require("sequelize");
const connection = require("../database/database");

const TipoDespesa = connection.define('tipodespesa',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

TipoDespesa.sync({force:false});

module.exports = TipoDespesa;