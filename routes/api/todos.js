const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

router.get('/', (req, res) => Todo.find().then(todos => res.json(todos)));

router.post('/', (req, res) => {
    const newTodo = new Todo({title: req.body.title});

    newTodo.save().then(todo => res.json(todo));
});

module.exports = router;
