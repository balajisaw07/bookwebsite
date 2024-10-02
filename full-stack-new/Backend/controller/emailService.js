import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// impo
dotenv.config();

// Configure the transporter (use your email service's SMTP settings)
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export const sendEmail = async (to, subject, text) => {
  const htmlContent = fs.readFileSync(path.resolve(htmlFilePath), 'utf-8');
  const mailOptions = {
    from: 'Om Kumavat',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// module.exports = sendEmail;
