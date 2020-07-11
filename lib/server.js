import express from 'express';
import config from './config';
import serverRender from './serverRender';


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const initialContent = serverRender(); // The reason for being a function is because
// sometimes we'll need to pass parameters, like the end points where's loading.

app.get('/', (req, res) => {
  res.render('index', { initialContent });
});
// since we have EJS templates we can pass variables directly
app.listen(config.port, function listenHandler() {
  console.info(`Runing on ${config.port}`);
});
