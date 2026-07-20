const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
res.send(`
<h2>YouTube Downloader</h2>

<form action="/download">
<input name="url" placeholder="YouTube Link" style="width:80%;padding:10px">
<br><br>
<button>Download MP4</button>
</form>

`);
});


app.get("/download", async(req,res)=>{

const url=req.query.url;

if(!url){
return res.send("Link দিন");
}

try{

res.header(
"Content-Disposition",
'attachment; filename="video.mp4"'
);

ytdl(url,{
quality:"highestvideo"
}).pipe(res);


}catch(e){

res.send("Video download error");

}

});


app.listen(PORT,()=>{
console.log("Server running");
});
