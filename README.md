# 🚀 Vibe Coding - CV to Portfolio Builder

A stunning, modern web application that transforms CVs into beautiful portfolio websites using AI-powered analysis and generation.

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Glassmorphism Design**: Modern glassmorphism effects with backdrop blur
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Design**: Perfect on all devices from mobile to desktop
- **Smooth Animations**: Floating elements, glow effects, and micro-interactions
- **Premium Typography**: Inter and Poppins fonts for professional look

### 🔐 **Authentication**
- **Firebase Authentication**: Email/password and Google Sign-In
- **Protected Routes**: Secure access to user-specific features
- **User Management**: Profile management and session handling

### 📄 **CV Management**
- **Upload CV**: Drag & drop PDF upload with AI analysis
- **Create CV**: Multi-step form with live preview
- **Real-time Preview**: See changes as you type
- **Drag & Drop**: Reorder sections before saving

### 🎯 **Portfolio Generation**
- **AI Analysis**: Intelligent extraction of CV data
- **Template Selection**: Multiple stunning portfolio templates
- **Customization**: Color schemes, layouts, and styling options
- **Live Preview**: See your portfolio before generation
- **Export Options**: Download as ZIP or deploy directly

## 🛠️ **Tech Stack**

- **Frontend**: React 19, Tailwind CSS 3, React Router v6
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Icons**: Lucide React, Heroicons
- **Fonts**: Google Fonts (Inter, Poppins)

## 🚀 **Getting Started**

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password + Google)
   - Enable Firestore Database
   - Enable Storage
   - Copy your config to `src/firebaseConfig.js`

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── Login.jsx        # Authentication pages
│   ├── Signup.jsx
│   ├── ProtectedRoute.jsx
│   └── LoadingSpinner.jsx
├── contexts/           # React contexts
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Dark/light mode
├── pages/             # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Dashboard.jsx   # User dashboard
│   ├── CreateCV.jsx    # CV creation form
│   ├── UploadCV.jsx    # CV upload & analysis
│   ├── PortfolioPreview.jsx # Portfolio generation
│   └── NotFound.jsx    # 404 page
├── utils/              # Utility functions
│   └── helpers.js      # Common helpers
├── firebaseConfig.js   # Firebase configuration
├── App.js             # Main app component
└── index.css          # Global styles
```

## 🎨 **Design System**

### Colors
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Purple gradient (#8B5CF6 to #EC4899)
- **Glass**: Semi-transparent overlays
- **Dark Mode**: Slate color palette

### Typography
- **Headings**: Poppins (Display font)
- **Body**: Inter (Sans-serif)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky headers with blur effects

## 🔧 **Available Scripts**

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from CRA (not recommended)

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Configure redirects for SPA routing

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Tailwind CSS** for the utility-first CSS framework
- **Firebase** for authentication and database services
- **Lucide React** for beautiful icons
- **Google Fonts** for typography
- **React Router** for client-side routing

---

**Built with ❤️ for the Vibe Coding Hackathon**