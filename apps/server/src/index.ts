import express from 'express';

const app = express();
const port = 4000;

app.get('/', (_req, res) => {
  res.send('Bruuda!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
