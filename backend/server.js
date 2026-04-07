const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

// CREATE
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body

  db.run(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ id: this.lastID, nome, email })
    }
  )
})

// READ
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json(err)
    res.json(rows)
  })
})

// UPDATE
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const { nome, email } = req.body

  db.run(
    'UPDATE usuarios SET nome=?, email=? WHERE id=?',
    [nome, email, id],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ id, nome, email })
    }
  )
})

// DELETE
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params

  db.run('DELETE FROM usuarios WHERE id=?', [id], function (err) {
    if (err) return res.status(500).json(err)
    res.json({ mensagem: 'Deletado' })
  })
})

app.listen(3000, () => {
  console.log('Backend rodando na porta 3000')
})