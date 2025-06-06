// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';
const { GoogleGenAI } = require("@google/genai");

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso
require('dotenv').config({ path: caminho_env }); // Carrega as variáveis de ambiente

var express = require('express');
var cors = require('cors');
var path = require('path');


var app = express();

// Importação das rotas
var indexRouter = require('./src/routes/index');
var usuarioRouter = require('./src/routes/usuarios');
var funcionarioRouter = require('./src/routes/funcionario');
var racksRouter = require('./src/routes/racks');
var sensoresRouter = require('./src/routes/sensores');
var leiturasRouter = require('./src/routes/leituras');
var alertasRouter = require('./src/routes/alertas')

// Middleware para tratar JSON, formulário e arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'inicial.html' }));

app.use(cors()); // Libera acesso externo (CORS)

// Rotas da aplicação
app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);
app.use('/funcionario', funcionarioRouter);
app.use('/racks', racksRouter);
app.use('/sensores', sensoresRouter);
app.use('/leituras', leiturasRouter);
app.use('/alertas', alertasRouter)

// Configurando o Gemini (Bob IA)
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// CORS para as requisições da IA também
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Rota da IA: recebe pergunta e responde com texto gerado
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Função que interage com o modelo da IA e retorna a resposta
async function gerarResposta(mensagem) {
    try {
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`
        });

        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const PORTA = process.env.APP_PORT || 3333;
const HOST = process.env.APP_HOST || 'localhost';

app.listen(PORTA, () => {
    console.log(`
    Servidor do site e da API BobIA rodando em: http://${HOST}:${PORTA}
    Ambiente: ${process.env.AMBIENTE_PROCESSO || ambiente_processo}
    `);
});

console.log("API KEY carregada:", process.env.MINHA_CHAVE);
