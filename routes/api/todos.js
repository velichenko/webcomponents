const express = require('express');
const router = express.Router();

const todos = [
    {id: 0, title: 'Write API on NodeJS'},
    {id: 1, title: 'Write client side with form'},
    {id: 2, title: 'Do email markup'},
    {id: 3, title: 'Write API om Python'}
];

router.get('/', (req, res) => res.json(todos));

module.exports = router;
