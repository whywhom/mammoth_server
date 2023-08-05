const Router = require('koa-router');
const router = new Router();
const {db} = require('../config/firebase')

const bookDbName = 'mammoth-books'

// Route to get all books
router.get('/books', async (ctx) => {

    const { page, pageSize } = ctx.request.query;
    const pageNum = parseInt(page) || 1;
    const pageSizeNum = parseInt(pageSize) || 10;

    // Calculate pagination parameters
    const totalBooks = await db.collection(bookDbName).get();
    const totalItems = totalBooks.size;
    const totalPages = Math.ceil(totalItems / pageSizeNum);
    const startIndex = (pageNum - 1) * pageSizeNum;

    // const snapshot = await db.collection(bookDbName).get();
    const snapshot = await db.collection(bookDbName).limit(pageSizeNum).offset(startIndex).get();

    const bookItems = []
    snapshot.forEach(doc => {
      const bookData = doc.data();
      const bookItem = {
          id: doc.id,
          ...bookData
      };
      bookItems.push(bookItem);
    });

    // Convert the snapshot to an array of book data
    const books = snapshot.docs.map((doc) => doc.data());

    ctx.body = {
      currentPage: pageNum,
      pageSize: pageSizeNum,
      totalPages,
      totalItems,
      books: bookItems,
    };

    // const bookJson = JSON.stringify(bookObj)
    // ctx.body = bookJson;
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
    downloadUri,
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
    uploader_id,
    tag,
    category
  } = ctx.request.body;

  try {
    const bookData = {
      coverUrl,
      code,
      auth,
      price,
      name,
      downloadUri,
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
      uploader_id,
      tag,
      category
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