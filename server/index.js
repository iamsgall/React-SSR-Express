import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3006);

// Middlewares
// Global Variables

// Routes
app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

// Static Files
app.use(express.static('./build'));

// Start Server
app.listen(app.get('port'), () => {
  console.log(`Server on port`, app.get('port'));
});
