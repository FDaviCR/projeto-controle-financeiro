const Sequelize = require("sequelize");
const connection = require("../database/database");

const TipoReceita = require("./TipoReceita");

const Receita = connection.define('receitas',{
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
    tiporeceitaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Receita.belongsTo(TipoReceita);

Receita.sync({force:false});

module.exports = Receita;
