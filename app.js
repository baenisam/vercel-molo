const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const BASE_URL = "https://backend.wafrimarket.com/api/";
const IMAGE_URL = "https://backend.wafrimarket.com/uploads/products/";

const app = express();

app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, "Wafri Market")
      .replace(
        /__DESCRIPTION__/g,
        "Wafri Market est une plateforme de commerce électronique qui facilite les Entrepreneurs Africains de créer leurs entreprises en ligne enfin de vendre sur le plan local, national et international leurs produits et services made in DRC(Africa).C'est l'un des produits de Wafri System avec comme siège social & nbsp; Congo - Kinshasa"
      );

    return res.send(data);
  });
});

app.get("/product/:slug", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log("Ok njo apa");
    const response = await axios.get(
      `${BASE_URL}public/products/bySlug/${req?.params?.slug}`
    );
    //if (!response?.data?.data) return res.status(404).send("Post not found");

    data = data
      .replace(/__TITLE__/g, response?.data?.data?.product?.name)
      .replace(/__DESCRIPTION__/g, response?.data?.data?.product?.description)
      .replace(/__IMAGE__/g, IMAGE_URL + response?.data?.data?.product?.image);

    res.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
