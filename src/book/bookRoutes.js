const Router = require('koa-router');
const router = new Router();
const {
  firebase,
  db
} = require('../config/firebase')
// const { initializeApp, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// const serviceAccount = require('../../mammoth-server-firebase-adminsdk-zwo8r-ce24c487f9.json');

// initializeApp({
//   credential: cert(serviceAccount)
// })

// const db = getFirestore();


// Route to get all books
router.get('/books', async (ctx) => {
    const snapshot = await db.collection('mammoth-books').get();
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
router.get('/books/:id', (ctx) => {
  const id = parseInt(ctx.params.id);
  const book = books.find((book) => book.id === id);

  if (book) {
    ctx.body = book;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Book not found' };
  }
});

// Add more routes as needed

module.exports = router;