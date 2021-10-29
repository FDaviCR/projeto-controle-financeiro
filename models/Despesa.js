const Sequelize = require("sequelize");
const connection = require("../database/database");

const TipoDespesa = require("./TipoDespesa");

const Despesa = connection.define('despesas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: true
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    },
    tipodespesaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Despesa.belongsTo(TipoDespesa);

Despesa.sync({force:false});

module.exports = Despesa;
