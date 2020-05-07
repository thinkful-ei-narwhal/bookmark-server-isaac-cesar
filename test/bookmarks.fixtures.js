const { v4: uuid } = require('uuid');

function makeBookmarksArray() {
  return [
    {id: uuid(),
      title: 'github',
      url: 'https://github.com/',
      description: 'github homepage',
      rating: 5 
    },
    {id: uuid(),
      title: 'youtube',
      url: 'https://youtube.com/',
      description: 'youtube homepage',
      rating: 3 
    },
    {id: uuid(),
      title: 'google',
      url: 'https://google.com/',
      description: 'google homepage',
      rating: 2 
    },
  ];
}

module.exports = {
  makeBookmarksArray,
};