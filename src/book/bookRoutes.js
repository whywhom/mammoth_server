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

router.post('/books', async (ctx) => {
  const { 
    coverUrl,
    code,
    auth,
    price,
    name,
    downloadUrl,
    publisher, 
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

module.exports = router;