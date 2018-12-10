const client = require('./api/client');
const todos = require('./api/todos');
const course = require('./api/course');

module.exports = {
  api: [
      {url: 'client', router: client},
      {url: 'todos', router: todos},
      {url: 'course', router: course}
  ]
};
