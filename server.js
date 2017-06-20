import express from 'express';
import bodyParser from 'body-parser';
import storage from 'node-persist';

storage.init({
  dir: 'data',
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: 'utf8',
}).then(() => {
  console.log('storage initialized');
}).catch((e) => {
  console.log('storage initialization failed');
  console.error(e);
});

const app = express();

app.use(bodyParser.json())

app.get('/content', (req, res) => {
  storage.getItem('content', (err, val) => {
    res.json(val || null);
  });
});

app.post('/content', (req, res) => {
  storage.setItem('content', req.body.content, (err, val) => {
    res.json({ok: true});
  });
});

app.listen(3001);
console.log('listening on http://localhost:3001');
