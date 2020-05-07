const express = require('express');
const { v4: uuid } = require('uuid');
let bookList = require('./store');
const logger = require('./logger');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
	.route('/')
	.get((req, res) => {
		res.status(201).json(bookList);
	})
	.post(bodyParser, (req, res) => {
		const { Title, Year = null, Author } = req.body;

		if (!Title) {
			logger.error('Title is requird');
			return res.status(400).send('Title is required');
		}

		if (!Author) {
			logger.error('Author is requird');
			return res.status(400).send('Author is required');
		}

		//Build book
		const id = uuid();
		const newBook = { id, Title, Year, Author };

		bookList.push(newBook);

		return res
			.status(201)
			.location(`http://localhost:8000/bookmarks/${id}`)
			.json(newBook);
	});

bookmarkRouter
	.route('/:id')
	.get((req, res) => {
		const id = req.params.id;

		const book = bookList.find((book) => {
			return id === book.id;
		});

		if (!book) {
			logger.error('Book not found');
			return res.status(404).send('Could not found the book');
		}

		res.status(201).json(book);
	})
	.delete((req, res) => {
		const id = req.params.id;

		const book = bookList.find((book) => {
			return id === book.id;
		});

		if (!book) {
			logger.error('Book not found');
			return res.status(404).send('Could not found the book');
		}

		if (book) {
			bookList = bookList.filter((item) => {
				item.id !== book.id;
			});
			return res.status(200).send('deleted');
		}
	});

module.exports = bookmarkRouter;
