# TaskFlow - Task Management Application

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB. Features a beautiful Material-UI interface with smooth animations and responsive design.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Categories**: Organize tasks by categories (Personal, Work, Health, etc.)
- **Dashboard Analytics**: View task statistics and completion rates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful Material-UI components with custom styling
- **Real-time Updates**: Instant task status updates
- **Profile Management**: User profile with avatar and personal information

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │   Express API   │    │   MongoDB       │
│   (Port 3000)   │◄──►│   (Port 5000)   │◄──►│   Database      │
│                 │    │                 │    │                 │
│ - Components    │    │ - Routes        │    │ - Users         │
│ - Pages         │    │ - Middleware    │    │ - Tasks         │
│ - Services      │    │ - Models        │    │ - Categories    │
│ - Context       │    │ - Controllers   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Project Structure

```
task-manager/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── layouts/                 # Layout components (Header)
│   │   ├── pages/                   # Page components
│   │   │   ├── AuthPage.js         # Authentication page
│   │   │   ├── DashboardPage.js    # Main dashboard
│   │   │   ├── LandingPage.js      # Landing/Home page
│   │   │   ├── LoginPage.js        # Login form
│   │   │   ├── ProfilePage.js      # User profile
│   │   │   └── RegisterPage.js     # Registration form
│   │   ├── services/
│   │   │   └── api.js              # API service functions
│   │   ├── utils/
│   │   │   └── AuthContext.js      # Authentication context
│   │   ├── App.js                  # Main App component
│   │   ├── index.js                # App entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── README.md
├── server/                          # Node.js Backend
│   ├── middleware/
│   │   └── auth.js                 # Authentication middleware
│   ├── models/
│   │   ├── User.js                 # User data model
│   │   └── Task.js                 # Task data model
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   └── tasks.js                # Task management routes
│   ├── index.js                    # Server entry point
│   ├── package.json
│   ├── .env                        # Environment variables
│   └── test-*.js                   # Test files
└── README.md                       # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Material-UI (MUI)** - Component library for consistent UI
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Create React App** - React app scaffolding
- **Nodemon** - Auto-restart for development
- **ESLint** - Code linting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Database Setup

Make sure MongoDB is running. If using MongoDB Atlas, update the connection string in `.env`.

## 🎯 Running the Application

### Development Mode

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Client:**
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

### Production Build

1. **Build the Frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the Backend:**
   ```bash
   cd server
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Task Routes (`/api/tasks`)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔧 Available Scripts

### Client Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Server Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
```

## 🎨 UI/UX Features

- **Responsive Design**: Adapts to all screen sizes
- **Dark/Light Theme**: Consistent color scheme
- **Smooth Animations**: Framer Motion for transitions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation
- **Accessibility**: ARIA labels and keyboard navigation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs for secure passwords
- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Server-side validation
- **Error Handling**: Comprehensive error management

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly interfaces
- Optimized layouts for small screens
- Fast loading on mobile networks

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### API Testing
Use tools like Postman or Thunder Client to test API endpoints.

## 🚀 Deployment

### Frontend Deployment
The built files in `client/build/` can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
The server can be deployed to:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Material-UI for the amazing component library
- Framer Motion for smooth animations
- Express.js community for the robust framework
- MongoDB for the flexible database solution

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy Task Managing! 🎯**