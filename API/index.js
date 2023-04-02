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
    apiKey: 'YOUR_API_KEY',
  })

  //If you don't have any DB, skip this part (line 36 to 40)

  /*let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let sql = "INSERT INTO `req` (`text`, `date`) VALUES ('" + textDB + "', '" + date + "');";
  db.query(sql, function (err, result) {
    if (err) throw err;
  })*/
  
  const assistant = 'Your assistant config' + text;

  //exemple : const assistant = 'You are John Wick, you are an assistant and you need to answer to the user : '+ text
  //keep the 'text' at the end of the assistant config
  
  const resp = await api.sendMessage(text)
  res.json({
    text: resp
  })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
})

