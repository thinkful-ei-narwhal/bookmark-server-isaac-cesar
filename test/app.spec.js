const app = require('../src/app');
const {bookmarks} = require('../src/store');

describe('App', () => {

  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, 'Hello, world!');
  });
  it('GET / responds with 401 if no authorization', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(401);
  });
  it('GET /bookmarks responds with 200 containing store', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, bookmarks);
  });
  it('POST /bookmarks responds with 201 containing newBookmark', () => {
    const newBookmark={
      title: 'github',
      url: 'https://github.com/',
      description : 'github homepage',
      rating: '5'
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(201)
      .expect(res=>{
        expect(res.body.title).to.eql(newBookmark.title);
        expect(res.body.url).to.eql(newBookmark.url);
        expect(res.body.description).to.eql(newBookmark.description);
        expect(res.body.rating).to.eql(newBookmark.rating);
      })
      .then(res => {
        expect(bookmarks[bookmarks.length - 1]).to.eql(res.body);
      });
  });

  it('POST /bookmarks responds with 400 when title missing', () => {
    const newBookmark={
      url: 'https://github.com/',
      description : 'github homepage',
      rating: '5'
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'title is required');
  });
  it('POST /bookmarks responds with 400 when url missing', () => {
    const newBookmark={
      title: 'github',
      description : 'github homepage',
      rating: '5'
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'url is required');
  });
  it('POST /bookmarks responds with 400 when url missing', () => {
    const newBookmark={
      title: 'github',
      url: 'https://github.com/',
      rating: '5'
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'description is required');
  });
  it('POST /bookmarks responds with 400 when url missing', () => {
    const newBookmark={
      title: 'github',
      url: 'https://github.com/',
      description : 'github homepage'
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'rating needs to be a number');
  });
  it('GET /bookmarks/:id responds with 400 when invalid', () => {
    return supertest(app)
      .get('/bookmarks/hgbhgug')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'bookmark was not found');
  });
  it('GET /bookmarks/:id responds with 200 containing bookmark', () => {
    return supertest(app)
      .get(`/bookmarks/${bookmarks[0].id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, bookmarks[0]);
  });
  it('DELETE /bookmarks/:id responds with 400 when invalid', () => {
    return supertest(app)
      .delete('/bookmarks/hgbhgug')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(404, 'Bookmark not found');
  });
  it('DELETE /bookmarks/:id responds with 200 containin bookmark', () => {
    return supertest(app)
      .delete(`/bookmarks/${bookmarks[0].id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, 'deleted');
  });
});