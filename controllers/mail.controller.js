const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

module.exports.sendMail = async (req, res) => {
  try {
    const data = req.body;
    const body = JSON.stringify(data);
   
    

    const message = {
      from: process.env.MAIL_HOST,
      to: process.env.MAIL_TO,
      subject: "New Query Received",
      text: body,
      dsn: {
        id: "",
        return: "full",
        notify: ["failure", "delay"],
        recipient: process.env.MAIL_TO,
      },
    };

    const transport = await nodemailer.createTransport({
      pool: true,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_AUTH,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transport.sendMail(message, function (err, info) {
      if (err) {
        return res.json({ statusCode: 400, message: err.message });
      } else{
            return res.json({ data: "sent", message: "Ok", statusCode: 200 });
        }
      
    
    });
  } catch (e) {
    return res.json({ statusCode: 400, message: e.message });
  }
};
