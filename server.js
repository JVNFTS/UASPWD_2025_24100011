const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gurules'
});

db.connect(err => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL');
});

app.post('/contact', (req, res) => {
  const { student_name, email, tutor_name, message} = req.body;
  const sql = `INSERT INTO kontak (nama, email, nama_guru, pesan)
               VALUES (?, ?, ?, ?)`;
  db.query(sql, [student_name, email, tutor_name, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Terjadi kesalahan server.');
    }
    res.send('Permintaan berhasil dikirim!');
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
