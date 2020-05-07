const BookmarksService = {
  getAllBookmarks(db) {
    return db('bookmarks_list')
      .select('*');
  },
  
  insertBookmark(db, data) {
    return db('bookmarks_list')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },
  
  getById(db, id) {
    return db('bookmarks_list')
      .select('*')
      .where({ id })
      .first();
  },
  
  deleteById(db, id) {
    return db('bookmarks_list')
      .where({ id })
      .delete();
  },
  
  updateById(db, id, data) {
    return db('bookmarks_list')
      .where({ id })
      .update(data);
  }
};
  
module.exports = BookmarksService;