const express = require("express");
var parseUrl = require("body-parser");

const API_KEY = "XXX";
const app = express();
let encodeUrl = parseUrl.urlencoded({ extended: false });

// allow user to access the web interface
app.get("/url", (req, res) => {
  res.sendFile(__dirname + "/form2.html");
});

// allow user to send post requests to mint NFTs

app.post("/url", encodeUrl, (req, res) => {
  console.log("Form request:", req.body);

  const sdk = require("api")("@verbwire/v1.0#hr2s143dl9hbr7s9");

  sdk.auth(API_KEY);
  sdk
    .post(
      "/nft/mint/quickMintFromMetadataUrl",
      {
        chain: req.body.chain,
        allowPlatformToOperateToken: "true",
        metadataUrl: req.body.url,
        description: req.body.name,
        recipientAddress: req.body.recipientAddress,
      },
      { accept: "application/json" }
    )
    .then((resp) => res.send(resp))
    .catch((err) => console.error(err));
});
app.listen(8080);
