const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');


app.use(cors());


app.use(bodyParser.json());

// Configuração do banco de dados
const db = new sqlite3.Database('./mydatabase.db');

// Criar tabelas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        task TEXT,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`);
});

// Rota para registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err) {
            if (err) {
                return res.status(400).json({ message: 'Usuário já existe.' });
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
});

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }
    
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        
        const token = jwt.sign({ id: user.id }, 'secreta', { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido!', token });
    });
});

// Rota para obter tarefas do usuário autenticado
app.get('/tasks', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    
    try {
        const decoded = jwt.verify(token, 'secreta');
        db.all(`SELECT * FROM tasks WHERE userId = ?`, [decoded.id], (err, tasks) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
            }
            res.json(tasks);
        });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});

// Rota para adicionar tarefas
app.post('/tasks', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    
    try {
        const decoded = jwt.verify(token, 'secreta');
        const { task } = req.body;
        db.run(`INSERT INTO tasks (userId, task) VALUES (?, ?)`,
            [decoded.id, task],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao adicionar tarefa.' });
                }
                res.status(201).json({ id: this.lastID, task, completed: 0 });
            });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
