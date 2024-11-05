//método será assíncrono, não irá retornar um valor imediatamente
async function connect() {

    //variável global para armazenar um pool de conexões
    if(global.connection)
        return global.connection.connect();
   
    //importar a classe pool do pacote pg: coleção de servidores
    const {Pool} = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    //await: pausar a execução de uma função assícrona
    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query('select now()');
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

connect();

async function selectCustomers(){
    const client = await connect();
    const res = await client.query("SELECT * FROM clientes");//enviar comandos do sql para o banco
    return res.rows;//resultados das consultas(linhas)
}
module.exports = {
    selectCustomers
}