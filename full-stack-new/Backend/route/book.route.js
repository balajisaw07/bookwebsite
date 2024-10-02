import express from 'express';
import multer from 'multer';
import {
  getBook, postBook, searchBook, getAllBook, deleteBook, getBookById, editBook,
  verifyBook
} from '../controller/book.controller.js';
import { sendEmail } from '../controller/emailService.js'

const router = express.Router();

router.get('/user/:id', getBook);
router.get('/all', getAllBook);
router.post('/post', postBook);
router.get('/search/:query', searchBook);
router.delete('/delete/:id', deleteBook);
router.get('/:id', getBookById);
router.put('/edit/:id', editBook);
router.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await sendEmail(email, subject, message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

router.put('/admin/verify/:id', verifyBook);

export default router;
