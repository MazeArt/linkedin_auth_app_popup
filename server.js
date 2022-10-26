
require("dotenv").config();
const path = require("path");

const express = require("express");
const server = express(); 
const axios = require("axios");

const s3 = require("./s3.js");

const getlin = require("./publish.js")
const testfunk = require("./func.js")

const options = {
  root: path.resolve(__dirname, 'public')
};

// server.register(require("fastify-static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/public/",
// });


//express code
server.use(express.static('./public'));

//

server.get("/oauth/linkedin/login/callback", async (request, reply) => {
  const { code } = request.query;
  console.log(request.query)

  const exchangeURL = new URL("oauth/v2/accessToken", "https://www.linkedin.com");
  exchangeURL.searchParams.set("client_id", process.env.CLIENT_ID);
  exchangeURL.searchParams.set("client_secret", process.env.CLIENT_SECRET);
  exchangeURL.searchParams.set("redirect_uri", encodeURI(process.env.URI));
  exchangeURL.searchParams.set("grant_type", "authorization_code");
  exchangeURL.searchParams.set("code", code);

  console.log(exchangeURL.toString());

  const response = await axios.post(exchangeURL.toString(), null, {
    headers: {
      Accept: "application/json",
    },
  });

  const { access_token } = response.data;
  console.log("access token server: " + access_token);

  const redirectionURL = new URL("popup", "http://localhost:3000");
  redirectionURL.searchParams.set("access_token", access_token);

  reply.status(302).header("Location", redirectionURL).send();
});

server.get("/new", (request, reply) => {
  return reply.sendFile("new.html");
});

server.get("/popup", (request, reply) => {
  return reply.sendFile("popup.html", options);
});

server.get("/", (request, reply) => {
  return reply.sendFile("index.html");
});

server.get("/s3Url", async (req,res) => {
  const url = await s3.generateUploadURL()
  console.log("server side s3.url:" + url)
  res.send({url})

} )

server.get("/post-to-linkedin", (request, reply) => {
  
  const { token } = request.query;

  let title = "Hola Mundo!";
  let text = "Probando la Api de Linkedin!";
  let shareUrl = "https://www.microsoft.com/es-cl/"
  let shareThumbnailUrl = "https://avatars-s3-upload-bucket.s3.amazonaws.com/71d114d48ef268fa4caae4dbd1d9f70b"

  getlin.share_post(token,title, text, shareUrl, shareThumbnailUrl);
  //getlin.myfunc2(token);

  reply.send ("published??: ") 
});


  
server.get("/testfunk", (request, reply) => {
  const { token } = request.query;
  testfunk.myfunc2(token);
  reply.send ("testing funk ended ") 
});

server.listen(3000, () => console.info("Server on http://localhost:3000"));
