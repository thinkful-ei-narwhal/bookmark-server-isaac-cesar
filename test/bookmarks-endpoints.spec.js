const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixtures');
const BookmarksServices = require('../');


describe('bookmark Endpoints', function() {

  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before('clean the table', () => db('bookmarks_list').truncate());
  afterEach('cleanup', () => db('bookmarks_list').truncate());
  after('disconnect from db', () => db.destroy());

  describe('GET /bookmarks',()=>{
    context('when db is empty',()=>{

      it('returns empty array',()=>{
        return; 
      });
    });
  });

});