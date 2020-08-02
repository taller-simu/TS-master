const express = require('express');
const app = express();
var cors = require('cors')



// Settings
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(require('./routes/datos'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});