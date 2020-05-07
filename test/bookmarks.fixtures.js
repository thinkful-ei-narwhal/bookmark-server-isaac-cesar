function makeBookmarksArray() {
  return [
    {id: 1,
      title: 'github',
      url: 'https://github.com/',
      description: 'github homepage',
      rating: 5 
    },
    {id: 2,
      title: 'youtube',
      url: 'https://youtube.com/',
      description: 'youtube homepage',
      rating: 3 
    },
    {id:3,
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