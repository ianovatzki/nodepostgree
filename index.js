//gerenciar variáveis de ambiente em um projeto
require("dotenv").config();

//importar o arquivo db.js
const db = require("./db");

//definir a porta do servidor
const port = process.env.PORT;

//importar o express
const express = require("express");

//renomear a variável app para express
const app = express();

//definir a rota raiz
app.get("/", (req, res) =>{
    res.json({message: "Funcionando"});
})

//definir a rota /clientes
app.get("/clientes", async (req, res) => {
    const clientes = await db.selectCustomers();
    res.json(clientes);
})

//ouvir conexões na porta definida
app.listen(port);

//exibir mensagem no console
console.log("Backend rodando");