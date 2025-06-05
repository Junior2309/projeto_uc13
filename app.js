const express = require('express'); //deixar padrão que o servidor web inicie automaticamente//
const app = express();
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port: 3306,
    database: 'ecommerce_pc'
});

conexao.connect(function(erro){
    if(erro){
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso');
});

app.get("/", function(req, res){
    res.write("Ola mundo!");
    res.end();
});

app.listen(8080);

