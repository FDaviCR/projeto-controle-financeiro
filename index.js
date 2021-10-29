const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Controllers
const despesaController = require("./controllers/DespesaController");
const receitaController = require("./controllers/ReceitaController");

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
const connection = require("./database/database");
connection.authenticate().then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((err)=>{
        console.log(err);
    }
)

app.use("/", despesaController);
app.use("/", receitaController);

app.listen(3000, () => {
    console.log("O servidor está rodando!")
});