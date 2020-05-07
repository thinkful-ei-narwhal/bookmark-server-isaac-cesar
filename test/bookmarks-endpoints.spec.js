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
    context('when db is not empty',()=>{
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
  //get /bookmarks finishes here
  describe('GET /bookmarks/:id',()=>{
    context('when db is not emptys', () => {
      it('responds with 404', () => {
        const bookmarkId = 65;
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: 'bookmark was not found' } });
      });
    });

    context('when db is not empty',()=>{
      const insertBookmarks=makeBookmarksArray();
      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks_list')
          .insert(insertBookmarks);
      });
      it('returns with 200 and the bookmark',()=>{
        const bookmarkId=2;
        const expectedBookmark =insertBookmarks[bookmarkId - 1];
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,expectedBookmark);
      });
    });
  });
  //get /bookmarks/:id finishes here


});