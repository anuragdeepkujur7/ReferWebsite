// server/index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

app.post('/api/refer', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  try {
    // Save referral data to the database
    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail }
    });

    // Send referral email using Google Mail Service API
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: refereeEmail,
      subject: 'Referral Invitation',
      text: `Hi ${refereeName},\n\n${referrerName} has referred you to our course!`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Referral submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting referral' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
