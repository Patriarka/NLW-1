// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que irá fazer oper. no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // Criando um arquivo novo

module.exports = db
// utilizar o objeto de banco de dados, para nossas operações

/* db.serialize(() => { 

    db.run('DELETE FROM places WHERE ID = ?', [8], function(err, rows) {
    if(err) {
        return console.log(err)
    }

    console.log("Registro deletado com sucesso!")
    }) 
}) */


