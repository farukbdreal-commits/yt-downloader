const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>YT Downloader</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>YouTube Video Downloader 🚀</h2>
            <form action="/download" method="GET">
                <input type="text" name="url" placeholder="Paste YouTube Link Here" style="width: 80%; padding: 10px;" required>
                <br><br>
                <button type="submit" style="padding: 10px 20px; font-size: 16px;">Download Video</button>
            </form>
        </body>
        </html>
    `);
});

app.get('/download', (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.send('Please provide a video URL!');
    }

    const timestamp = Date.now();
    const fileName = `video_${timestamp}.mp4`;
    const outputPath = path.join(__dirname, fileName);

    const command = `yt-dlp -f "b[ext=mp4]/b" -o "${outputPath}" "${videoUrl}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('ডাউনলোড করতে সমস্যা হয়েছে! লিংকটি পুনরায় চেক করুন।');
        }

        // ব্রাউজারে সরাসরি ফাইল পাঠিয়ে ডাউনলোড শুরু করানো
        res.download(outputPath, 'YouTube_Video.mp4', (err) => {
            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
