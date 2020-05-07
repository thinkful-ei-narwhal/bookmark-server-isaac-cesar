const { v4: uuid } = require('uuid');

const bookmarks = [
  { id: uuid(),
    title: 'github',
    url: 'https://github.com/',
    description: 'github homepage',
    rating: 5 },
];

module.exports = { bookmarks };
