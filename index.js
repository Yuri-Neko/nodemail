const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('./setting.js');
const axios = require('axios');


//const apikeyss = ['APIKEY1', 'APIKEY2', 'KYOUKA'];
// middleware untuk memastikan parameter apikey
const checkApiKey = (req, res, next) => {
  const apikey = req.query.apikey;
  if (apiKeys.includes(apikey)) {
    next();
  } else {
    res.status(401).send('APIKEY TIDAK VALID');
  }
};


app.get('/', (req, res) => {
	let baseUrl = `https://${req.get('host')}`
	res.json({
		runtime: new Date(process.uptime() * 1000).toTimeString().split(' ')[0],
		result: {
			tools: {
				sendEmail: `${baseUrl}/send-email?apikey=Your_Key&from=Your_Name&to=To&text=Message`
			},
      getApikey: {
        contac_admin: "admin@api-kyoua.my.id"
      }
		}
	})
})



// rute endpoint untuk mengirim email
app.get('/send-email', checkApiKey, async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });

    const { from, to, text } = req.query;
    if (!from) return res.json("tidak ada parameter from. example &from=Nama")
    if (!to) return res.json("tidak ada parameter to. example &to=email@gmail.com")
    if (!text) return res.json("tidak ada parameter text. example &text=your_message")

    const response = await axios.get(UrlWaifuIm);
const imageUrl = response.url;

    const mailOptions = {
      from: from,
      to: to,
      subject: "IMAGE SFW MAILER",
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
   
      .image-container {
        border: 2px solid #ccc;
        display: inline-block;
        margin-right: 10px;
        padding: 10px;
        max-width: 500px;
        box-sizing: border-box;
      }

      .image-container img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
        border: 1px solid #ccc;
      }

      .description {
        border: 2px solid #ccc;
        display: inline-block;
        padding: 10px;
        width: 300px;
        box-sizing: border-box;
        font-size: 14px;
      }

      .description h2 {
        margin-top: 0;
        font-size: 16px;
      }

      .description p {
        margin-bottom: 0;
      }

      @keyframes titleAnim {
        0% {
          opacity: 0;
          transform: translateY(-50px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>
  <body>
    <div class="image-container">
      <img src="https://i.waifu.pics/J4BQUxi.jpg" alt="gambar">
    </div>
    <div class="description">
      <h2>From</h2>
      <p>${from} to you</p>
      <h2>Message</h2>
      <p>${text}</p>
    </div>
  </body>
</html>
`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// jalankan server di port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
