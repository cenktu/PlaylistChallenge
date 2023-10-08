import express from 'express';
import bodyParser from 'body-parser';
import playlistRoutes from './routes/playlists.js';
import cors from 'cors';

const app = express();
const PORT = 1955;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', playlistRoutes);

/*app.get("/api",(req,res)=>{
    res.json('{"playlist":["name","type","url","duration"]}')
})*/

app.listen(PORT,()=> 
    console.log(`Server running on port: http://localhost:${PORT}`))