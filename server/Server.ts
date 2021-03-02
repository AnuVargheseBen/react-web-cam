
const express = require('express');
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const { promisifyFun, initialiseENV } = require("./helper");
const sendEmail = require("./sendMail");

initialiseENV();
const app = express();
const port = 3333;
app.use(bodyParser.json({ limit: "50mb", extended: true }));

const options = { format: "A4" };

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

type ImgSize = { width?: number; height?: number };

type ScreenshotBody = {
  base64Img: string
  imgSize: ImgSize
}

app.post("/screenshot", async (req: any, res: any) => {
  try {
    const { base64Img, imgSize } = req.body as ScreenshotBody;
    const widthOrHeight = Object.entries(imgSize)[0] as Array<any>;
    const html = `<html><body><img src="${base64Img}" ${widthOrHeight[0]}="${widthOrHeight[1] / 2}"/></body></html>`;

    const pInstance = pdf.create(html, options);
    const unboundToBuffer = pInstance.toBuffer;
    const toBuffer = unboundToBuffer.bind(pInstance);
    const bufferPdf = await promisifyFun(toBuffer);

    const filename = `cam picture ${Date.now().toString()}.pdf`;

    await sendEmail("Web cam picture", "Please see the below attachment", [
      {
        filename: filename,
        content: bufferPdf,
      },
    ]);
    res.send("Success");
  } catch (e) {
    res.status(500).send('Some technical error, Please contact Admin or try after sometime.')
  }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
