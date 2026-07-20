const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <title>YT Downloader</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body style="text-align:center;font-family:Arial;padding-top:50px">

    <h1>YouTube Video Downloader 🚀</h1>

    <form action="/download">
    <input 
    name="url"
    placeholder="Paste YouTube Link"
    style="width:80%;padding:12px"
    required>

    <br><br>

    <button style="padding:12px 25px">
    Download MP4
    </button>

    </form>

    </body>
    </html>
    `);
});


app.get("/download", async(req,res)=>{

    const url=req.query.url;

    if(!url){
        return res.send("Link দিন");
    }


    try{

        if(!ytdl.validateURL(url)){
            return res.send("Invalid YouTube URL");
        }


        res.setHeader(
            "Content-Disposition",
            'attachment; filename="video.mp4"'
        );


        ytdl(url,{
            quality:"highestvideo"
        }).pipe(res);


    }catch(error){

        console.log(error);

        res.status(500).send(
        "ভিডিও আনতে সমস্যা হয়েছে"
        );

    }

});


app.listen(PORT,()=>{
console.log(
`Server running on ${PORT}`
);
});
