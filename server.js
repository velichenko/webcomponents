const express = require('express');
const mongoose = require('mongoose');

const client = require('./routes/api/client');
const todos = require('./routes/api/todos');

const app = express();

app.use(express.json());

const db = require('./config/application-dev').mongodb;

mongoose
    .connect(db.url, {useNewUrlParser: true, auth: {user: db.user, password: db.password}})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/api/client', client);
app.use('/api/todos', todos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
