const knex = require('knex');
const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixtures');
const BookmarksServices = require('../src/bookmarks-services');


describe('bookmark Endpoints', function() {

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


  describe.only('GET /bookmarks',()=>{
    context('when db is empty',()=>{

      it('returns empty array',()=>{
        console.log(process.env.TEST_DB_URL);
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200,[]);
      });
    });
  });

});