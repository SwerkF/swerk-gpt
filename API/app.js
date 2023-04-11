const express = require('express');
const bodyparser = require('body-parser');
const app = express();
//import db.cjs
const db = require('./db.js');
const cors = require('cors')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors({
  origin: 'http://swerk.fr',
}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
});

app.get('/api', (req, res) => {
  //load index.html
  res.json({
    text: "Hello World"
  })
})

async function start() {
  const {ChatGPTAPI} = await import('chatgpt');

  app.post('/api/complete', async (req, res) => {
      const text = req.body.text;
    
      const api = new ChatGPTAPI({
        apiKey: ''
      })
  
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let sql = "INSERT INTO `req` (`text`, `date`) VALUES ('" + text + "', '" + date + "');";

      
      db.query(sql, function (err, result) {
        if (err) res.json({
          text: err
        });
      })
      
  
      const resp = await api.sendMessage("Tu t'appelles SwerkGPT. Tu es un assistant développé par un étudiant en BTS SIO. A chaque fin de phrase, tu feras une petite blague OBLIGATOIREMENT à l'utilisateur qui te posra une question. Un utilisateur à une requête pour toi, réponds lui : " + text)
      
      res.json({
        text: resp
      })


  });

  app.use('/api/images/', express.static('images'));
  
  app.listen(3000, () => {
    console.log('App listening on port ' + 3000 + ' !');
  });
}

start();
