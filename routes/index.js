const client = require('./api/client');
const todos = require('./api/todos');

module.exports = {
  api: [
      {url: 'client', router: client},
      {url: 'todos', router: todos}
  ]
};
