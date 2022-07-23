import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 8000;
const app = express();

app.get('/', (req, res) => {
    console.log(req.path);
    res.sendFile(path.join(__dirname, '../../src/index.html'));
});
app.use(express.static('build/src'));
app.use(express.static('build/src/cpu'));
app.use(express.static('build/src/gpu'));
app.use(express.static('build/src/memory'));
app.use(express.static('build/src/instructions'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
