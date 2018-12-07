const express = require('express');

const validator = require('../../validation').todos;

const router = express.Router();

const Todo = require('../../models/Todo');

router.get('/', (req, res) => Todo.find().then(todos => res.json(todos)));

router.post('/', (req, res) => {
    const {errors, isValid} = validator(req.body);

    if (!isValid) {
        return res.status(400).json({errors});
    }

    const newTodo = new Todo({title: req.body.title});

    newTodo.save().then(todo => res.json(todo));
});

router.get('/:id', (req, res) => Todo
    .findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(() => res.status(500).json({message: 'failure'}))
);

router.put('/:id', (req, res) => Todo
    .findById(req.params.id)
    .then(todo => {
        todo.title = req.body.title;

        todo.save().then(todo => res.json(todo));
    })
    .catch(() => res.status(500).json({message: 'failure'}))
);

router.delete('/:id', (req, res) => Todo
    .findById(req.params.id)
    .then(todo => todo
        .remove()
        .then(() => res.json({message: 'success'}))
        .catch(() => res.status(500).json({message: 'failure'}))
    )
);

module.exports = router;
