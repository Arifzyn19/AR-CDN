[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<p align="center">
    <img src="/public/images/logo.jpg" width="100%" style="margin-left: auto;margin-right: auto;display: block;">
</p>

<h1 align="center">AR CDN - Host File</h1>
<p align="center"><strong>Version 2.1.0</strong></p>

<p align="center">
<a href="https://github.com/Arifzyn19"><img title="Author" src="https://img.shields.io/badge/AUTHOR-Arifzyn19-green.svg?style=for-the-badge&logo=github"></a>
</p>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 About

AR CDN is a robust and flexible file upload service designed for handling various types of files, including images, videos, and audio. Built using TypeScript, this project emphasizes a clean directory structure and ease of use. With simple installation steps and a development server setup, users can quickly integrate file uploading functionality into their applications.

## ✨ Features

- **File Uploads** - Support for images, videos, audio, and documents
- **Type Checking** - Built with TypeScript for type safety
- **RESTful API** - Easy integration with your applications
- **Image Processing** - Resize, optimize, and convert images
- **Admin Dashboard** - Monitor and manage uploaded files
- **Authentication** - Secure your uploads with API keys
- **Access Control** - Public and private file options
- **Rate Limiting** - Prevent abuse of your CDN
- **Responsive UI** - Clean interface for upload and management

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: Handlebars, TailwindCSS, DaisyUI
- **Database**: File system (with metadata tracking)
- **File Processing**: Multer, Sharp
- **Security**: Helmet, CORS, Rate limiting
- **Logging**: Winston, Morgan

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Arifzyn19/AR-CDN.git
cd AR-CDN
```

2. **Install dependencies**

```bash
npm install
```

3. **Build the project**

```bash
npm run build:all
```

4. **Start the development server**

```bash
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
API_KEY_SECRET=your-secret-key
```

## 📝 Usage

### Web Interface

1. Navigate to `http://localhost:3000` in your browser
2. Use the upload form to select and upload files
3. View and manage your uploads through the dashboard

### API Usage

```javascript
// Example: Upload a file using fetch
const form = new FormData();
form.append('file', fileInput.files[0]);

fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  headers: {
    'X-API-KEY': 'your-api-key'
  },
  body: form
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|--------------|
| `/api/upload` | POST | Upload a file | Yes |
| `/api/files` | GET | List all files | Yes |
| `/api/files/:id` | GET | Get file details | Yes |
| `/api/files/:id` | DELETE | Delete a file | Yes |
| `/api/stats` | GET | Get storage statistics | Yes |
| `/files/:filename` | GET | Serve a file | No |
| `/images/:filename` | GET | Serve an image with processing options | No |

## 📁 Folder Structure

```
AR-CDN/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middlewares/  # Express middlewares
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   ├── styles/       # CSS styles
│   └── index.ts      # Application entry point
├── public/           # Static assets
├── uploads/          # Uploaded files directory
├── views/            # Handlebars templates
├── tests/            # Test files
├── dist/             # Compiled JavaScript
└── docker/           # Docker configuration
```

## 🐳 Docker Deployment

Build and run the Docker container:

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

Or use Docker Compose:

```bash
docker-compose up -d
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Arifzyn19">Arifzyn19</a>
</p>