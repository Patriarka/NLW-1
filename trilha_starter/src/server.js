const express = require("express")
const server = express()

// Pegar o bando de dados
const db = require("./database/db.js")

// Configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine - nunkucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {  // pasta html e server express
    express: server,
    noCache: true // Não usar cache 
})

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa url

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    // req.body = corpo do nosso formulário
    // console.log(req.body)   
    // Inserir dados no db
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) { // Se erro existir
            return res.send("Erro no cadastro!")
        } 

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        // Mostrar a page html com os dados do db
        return res.render("search-results.html", { total: 0 }) // Ou só passar total 
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        // Mostrar a page html com os dados do db
        return res.render("search-results.html", { places: rows, total: total }) // Ou só passar total 
    })
}) 

// Ligar o servidor
server.listen(3000)