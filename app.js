// Importa o framework Express, que facilita a criação de servidores web no Node.js
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();

// Importa apenas o mecanismo de template 'engine' do pacote express-handlebars
const { engine } = require('express-handlebars');

// Importa o pacote mysql2, que permite conectar e interagir com bancos de dados MySQL
const mysql = require('mysql2');

// Torna os arquivos do Bootstrap (CSS/JS) disponíveis publicamente no caminho '/bootstrap'
// Assim, arquivos de estilo e scripts do Bootstrap podem ser usados no front-end
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Configura o Handlebars como motor de template para renderizar páginas HTML dinamicamente
app.engine('handlebars', engine());

// Define que o motor de visualização padrão será o Handlebars
app.set('view engine', 'handlebars');

// Define o diretório onde estarão os arquivos de views (páginas Handlebars)
app.set('views', './views');

// Cria a conexão com o banco de dados MySQL usando as credenciais fornecidas
const conexao = mysql.createConnection({
    host: 'localhost',     // Endereço do servidor MySQL
    user: 'root',          // Nome de usuário para acesso ao banco
    password: 'senac',     // Senha correspondente ao usuário
    port: 3306,            // Porta padrão do MySQL
    database: 'ecommerce_pc' // Nome do banco de dados que será usado
});

// Tenta estabelecer uma conexão com o banco de dados
conexao.connect(function(erro){
    
    // Se ocorrer algum erro durante a tentativa de conexão
    if(erro){
        // Exibe uma mensagem de erro no console com detalhes
        console.error('Erro ao conectar ao banco de dados:', erro);
        return; // Encerra a função para não continuar a execução
    }

    // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso
    console.log('Conexão com o banco de dados estabelecida com sucesso');
});


// Define uma rota GET para o caminho raiz ("/")
app.get('/', (req, res) => {
    
    // Cria uma instrução SQL para buscar todos os registros da tabela 'produtos'
    let sql = 'SELECT * FROM produtos';

    // Executa a consulta SQL usando a conexão com o banco de dados
    conexao.query(sql, function (erro, produtos_qs) { 

        // Se ocorrer um erro na consulta ao banco
        if(erro){
            // Exibe o erro no console
            console.error('Erro ao consultar produtos:', erro);

            // Envia uma resposta HTTP 500 (erro interno do servidor)
            res.status(500).send('Erro ao consultar produtos');
            return; // Encerra a execução da função
        }

        // Se a consulta for bem-sucedida, renderiza a view 'index'
        // Passando os dados obtidos do banco como o contexto da view (objeto "produtos")
        res.render('index', { produtos: produtos_qs });
    });
});

app.get('/clientes', (req, res) => {;
    let sql = 'SELECT * FROM clientes';
    conexao.query(sql, function (erro, clientes_qs) { 
        if(erro){
            console.error('Erro ao consultar clientes:', erro);
            res.status(500).send('Erro ao consultar clientes');
            return;
        }
        res.render('clientes', {clientes: clientes_qs});
    });
}
);

// Inicia o servidor e o faz escutar na porta 8080
app.listen(8080);


