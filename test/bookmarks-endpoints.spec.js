const knex = require('knex');
const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixtures');
const BookmarksServices = require('../src/bookmarks-services');


describe.only('bookmark Endpoints', function() {

  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  before('clean the table', () => db('bookmarks_list').truncate());
  afterEach('cleanup', () => db('bookmarks_list').truncate());
  after('disconnect from db', () => db.destroy());


  describe('GET /bookmarks',()=>{
    context('when db is empty',()=>{
      it('returns empty array',()=>{
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,[]);
      });
    });
    context('when db is empty',()=>{
      const insertBookmarks=makeBookmarksArray();
      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks_list')
          .insert(insertBookmarks);
      });
      it('returns with 200 and all bookmarks',()=>{
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,insertBookmarks);
      });
    });

  });

});