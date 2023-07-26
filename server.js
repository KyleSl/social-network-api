const express = require('express');
const db = require('./config/connection');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

db.once('open', () => {
    console.log('Connected to ' + db.name);
    
    app.listen(PORT, () => {
        console.log('App listening at http://localhost:' + PORT);
    });
});