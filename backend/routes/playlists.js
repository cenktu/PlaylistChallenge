import express from 'express';

const router = express.Router();

const playlists = [
    
    {
        name : "My Image",
        type: "image",
        url: "https://thispersondoesnotexist.com/",
        duration: 3
    },
    {
        name: "My Image",
        type: "video",
        url: "https://file-examples.com/storage/feaade38c1651bd01984236/2017/04/file_example_MP4_1920_18MG.mp4",
        duration: 1,
    },
    {
        name: "My Image",
        type: "image",
        url: "https://picsum.photos/seed/picsum/200/300",
        duration: 1,
    },
];


router.get('/playlist', (req,res) =>{
    
    res.send(playlists);
    
});

router.post("/add",(req,res)=>{
    
    const playlist = req.body;

    playlists.push(playlist);
    res.send(`Playlist with the name ${playlist.name} added to the content!`)

    
});

export default router;