import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD, 
      },
    });
    
    const { name, email, message } = req.body;

    const mailData = {
      from: email,
      to: 'nemotogaku1@gmail.com', // your email address
      subject: `[Contact Form] New message from ${name}`,
      text: `${message}`,
      html: `<p>${message}</p>`,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
