const Router = require('koa-router');
const router = new Router();
const {db} = require('../config/firebase')

const bookDbName = 'mammoth-books'

// Route to get all books
router.get('/books', async (ctx) => {
    const snapshot = await db.collection(bookDbName).get();
    const books = []
    snapshot.forEach(doc => {
      const bookData = doc.data();
      const bookItem = {
          id: doc.id,
          ...bookData
      };
      books.push(bookItem);
    });
    const bookObj = {
      books,
      total: books.length,
    };
    const bookJson = JSON.stringify(bookObj)
    ctx.body = bookJson;
});

// Route to get a specific book by ID
router.get('/books/:id', async (ctx) => {
  const id = ctx.params.id;
  try {
    const docRef = db.collection(bookDbName).doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      const book = doc.data();
      ctx.body = book;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Book not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error retrieving book' };
  }
});

// Add a new book
router.post('/books', async (ctx) => {
  const { 
    coverUrl,
    code,
    author,
    price,
    name,
    downloadUrl,
    publisher, 
    title,
    book_description,
    author_description,
    isbn,
    publish_date,
    format,
    note,
    rank,
    download_times,
    uploader_id
  } = ctx.request.body;

  try {
    const bookData = {
      coverUrl,
      code,
      auth,
      price,
      name,
      downloadUrl,
      publisher,
      title,
      book_description,
      author_description,
      isbn,
      publish_date,
      format,
      note,
      rank,
      download_times,
      uploader_id
    };

    const docRef = await db.collection(bookDbName).add(bookData);

    const newBookId = docRef.id;
    ctx.status = 201;
    ctx.body = { id: newBookId, ...bookData };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error creating book' };
  }
});

// Update a book by ID
router.put('/books/:id', async (ctx) => {
  const id = ctx.params.id;
  const { title, author } = ctx.request.body;

  try {
    const docRef = db.collection(bookDbName).doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ title, author });
      ctx.body = { id, title, author };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Book not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error updating book' };
  }
});

// Delete a book by ID
router.delete('/books/:id', async (ctx) => {
  const id = ctx.params.id;

  try {
    const docRef = db.collection(bookDbName).doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.delete();
      ctx.body = { id };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Book not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error deleting book' };
  }
});

module.exports = router;