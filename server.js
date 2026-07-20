const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
  <h2>YouTube Downloader</h2>
  <form action="/download">
  <input name="url" placeholder="YouTube URL" style="width:80%;padding:10px">
  <br><br>
  <button>Download MP4</button>
  </form>
  `);
});


app.get("/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.send("YouTube link দিন");
  }

  try {

    const info = await ytdl.getInfo(url);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="video.mp4"'
    );

    ytdl(url, {
      quality: "highest",
      filter: "audioandvideo"
    }).pipe(res);


  } catch (err) {

    console.log(err);
    res.status(500).send("ভিডিও ডাউনলোড করা যাচ্ছে না");

  }

});


app.listen(PORT, () => {
 console.log("Server running on port " + PORT);
});
