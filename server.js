const express = require('express');
const mongoose = require('mongoose');

const {api} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const {mongodb} = require('./config/application-dev');

mongoose
    .connect(mongodb.url, {useNewUrlParser: true, auth: {user: mongodb.user, password: mongodb.password}})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

for (const route of api) {
    app.use(`/api/${route.url}`, route.router);
}

app.use((req, res) => res.status(404).send(`Not Found`));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
