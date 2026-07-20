const express = require("express");
const ytdl = require("@distube/ytdl-core");

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html>

<head>
<title>YouTube Downloader</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

</head>


<body style="text-align:center;font-family:Arial;padding:40px">

<h2>YouTube Downloader</h2>


<form action="/download">

<input 
name="url"
placeholder="Paste YouTube URL"
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


const url = req.query.url;


if(!url){

return res.send("YouTube link দিন");

}



try{


if(!ytdl.validateURL(url)){

return res.send("ভুল YouTube link");

}



res.setHeader(
"Content-Disposition",
'attachment; filename="video.mp4"'
);



const stream = ytdl(url,{
quality:"highest"
});



stream.on("error",(err)=>{

console.log(err);

if(!res.headersSent){

res.send("ভিডিও আনতে সমস্যা হয়েছে");

}

});



stream.pipe(res);



}catch(error){

console.log(error);

res.send("Server error");

}


});



app.listen(PORT,()=>{

console.log(
"Server running on port "+PORT
);

});
