import express from 'express';
import { readFile, writeFile } from 'fs';
import { join, dirname } from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const { json } = bodyParser;

const app = express();
app.use(json());

// Obtém o caminho do diretório atual em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrlFile = join(__dirname, 'src', 'data', 'baseUrl.json');
const videosFile = join(__dirname, 'src', 'data', 'videos.json');

app.get('/api/baseUrl', (req, res) => {
  readFile(baseUrlFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo baseUrl.json:", err);
      return res.status(500).json({ error: 'Erro ao ler a URL base.' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      res.status(500).json({ error: 'Erro ao processar a URL base.' });
    }
  });
});

app.get('/api/videos', (req, res) => {
  readFile(videosFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo videos.json:", err);
      return res.status(500).json({ error: 'Erro ao ler os vídeos.' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (parseError) {
      res.status(500).json({ error: 'Erro ao processar os vídeos.' });
    }
  });
});

app.post('/api/videos', (req, res) => {
  const { videoId1, videoId2 } = req.body;
  const newData = { videoId1, videoId2 };
  writeFile(videosFile, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Erro ao atualizar videos.json:", err);
      return res.status(500).json({ error: 'Erro ao atualizar os vídeos.' });
    }
    res.status(200).json(newData);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});