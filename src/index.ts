import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';

const app = express();
const port = process.env.PORT || 4321;

const hbs = engine({
  extname: 'jmk',
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: path.join(__dirname, '../views/partials'),
});

Handlebars.registerHelper('includes', function (str: string, substring: string) {
  return str.includes(substring);
});

app.engine('jmk', hbs);
app.set('view engine', 'jmk');
app.set('views', path.join(__dirname, '../views'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home | AR CDN' });
});

app.get('/docs', (req: Request, res: Response) => {
  res.render('docs', { title: 'Docs | AR CDN' });
});

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.redirect(`/data/${req.file.filename}`);
});

app.get('/data/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  if (fs.existsSync(filePath)) {
    res.render('result', {
      title: 'File Result | AR CDN',
      fileUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
      filename
    });
  } else {
    res.status(404).send('File not found');
  }
});

app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    filename: req.file.filename,
    size: req.file.size,
    url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});