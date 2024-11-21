import express from "express";
import Agenda from "agenda";
import nodemailer from "nodemailer";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URL for Agenda
const mongoConnectionString = "mongodb://localhost:27017";
const agenda = new Agenda({ db: { address: mongoConnectionString } });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daymarafik123@gmail.com",
    pass: "Dayma@123",
  },
});

// Define the email sending job
agenda.define("send email", async (job) => {
  const { email, subject, body } = job.attrs.data;

  try {
    await transporter.sendMail({
      from: "daymarafik123@gmail.com",
      to: email,
      subject,
      text: body,
    });
    console.log(`Email sent to ${email}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
});

// API to schedule email
app.post("/api/schedule-email", async (req, res) => {
  const { email, subject, body, time } = req.body;

  if (!email || !subject || !body || !time) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    // Schedule the email
    await agenda.schedule(new Date(Date.now() + time * 60 * 1000), "send email", {
      email,
      subject,
      body,
    });
    res.status(200).send({ message: "Email scheduled successfully" });
  } catch (err) {
    console.error("Error scheduling email:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Start Agenda and Express server
agenda.start();
app.listen(3000, () => console.log("Server running on port 3000"));
