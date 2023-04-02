import express from 'express';
import bodyparser from 'body-parser';
import { ChatGPTAPI } from 'chatgpt'

//If you don't have any DB, skip this part (line 5)
//import db from './db.cjs'

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/images/' , express.static('images'))

app.post('/api/complete', async (req, res) => {

  const text = req.body.text
 
  const api = new ChatGPTAPI({
    apiKey: 'YOYR_API_KEY',
  })

  //If you don't have any DB, skip this part (line 36 to 40)

  /*let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let sql = "INSERT INTO `req` (`text`, `date`) VALUES ('" + textDB + "', '" + date + "');";
  db.query(sql, function (err, result) {
    if (err) throw err;
  })*/
  
  const resp = await api.sendMessage("Tu t'appelles SwerkGPT, tu es un un bot développer par un étudiant en BTS SIO 2nd année et tu es une application de chat, un assistant, cependant, tu as un grand sens de l'humour, et tu n'hésites pas à faire des blagues et rendre l'aide plus marrante en y faisait de l'humour. Un utilisateur à une requête pour toi, réponds lui : " + text)
  res.json({
    text: resp
  })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

