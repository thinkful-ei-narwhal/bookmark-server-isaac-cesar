const express = require('express');
const { v4 : uuid} = require('uuid');
const logger = require('./logger');
const { bookmarks }= require('./store');
const { PORT} = require('./config');
const store = require('./store');
const bookmarkServices = require('./bookmarks-services');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/')
  .get((req, res) => {
    bookmarkServices.getAllBookmarks(req.app.get('db'))
      .then(bookmarks=>res.json(bookmarks));
  })
  .post(bodyParser,(req, res,next) => {

    const {
      title,
      url,
      description,
      rating,
    } = req.body;

    if (!title) {
      logger.error('title is required');
      return res.status(400).send('title is required');
    }
    if (!url) {
      logger.error('url is required');
      return res.status(400).send('url is required');
    }
    if (!description) {
      logger.error('description is required');
      return res.status(400).send('description is required');
    }
    if (!rating || !Number.isInteger(Number(rating))) {
      logger.error('rating needs to be a number');
      return res.status(400).send('rating needs to be a number');
    } 

    const id = uuid();
    const newBookmarks = {
      title,
      url,
      description,
      rating,
      id,
    };

    bookmarkServices.insertBookmark(req.app.get('db'),newBookmarks)
      .then(bookmark=>
        res
          .status(201)
          .location(`http://localhost:${PORT}/bookmarks/:${newBookmarks.id}`)
          .json(newBookmarks));
  });

bookmarksRouter
  .route('/:id')
  .get((req, res,next) => {
    const { id } = req.params;
    bookmarkServices.getById(req.app.get('db'),id)
      .then(bookmarks=>res.json(bookmarks))
      .then(bookmark => {
        if (!bookmark) {
          logger.error('bookmark was not found');
          return res.status(400).send('bookmark was not found');
        }

        res.json(bookmark);
      })
      .catch(next);
  })
  .delete((req, res) => {
    const { id } = req.params;
  
    const index = store.bookmarks.findIndex(e=>e.id===id);
  
    if(index=== -1){
      logger.info('Bookmark not found');
      return res.status(404).send('Bookmark not found');
    }
  
    store.bookmarks.splice(index,1);

    logger.info('Bookmark was deleted.');
    res.send('deleted');
  });
  
module.exports = bookmarksRouter;