const connectToMongo = require ('./db.js');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');

app.use(cors());
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/author', require ('./routes/author'))
app.use('/api/notes', require('./routes/notes')); 

app.listen(port, () => {
  
  console.log(`http://localhost:${port}`)
})