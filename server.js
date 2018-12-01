const express = require('express');

const client = require('./routes/api/client');
const todos = require('./routes/api/todos');

const app = express();

app.use(express.json());

app.use('/api/client', client);
app.use('/api/todos', todos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
