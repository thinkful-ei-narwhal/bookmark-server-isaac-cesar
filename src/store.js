const { v4: uuid } = require('uuid');

const store = [
  { id: uuid(),
    title: 'github',
    url: 'https://github.com/',
    description: 'github homepage',
    rating: 5 },
];

module.exports = store;
