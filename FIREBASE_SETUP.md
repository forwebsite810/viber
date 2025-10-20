# Firebase Setup Instructions

## 🔥 Firebase Configuration Required

To fix the authentication errors, you need to configure Firebase properly:

### 1. Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Select your project: `builder-vibecoding`

### 2. Enable Authentication Methods

#### Email/Password Authentication:
1. Go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable **Email/Password** provider
4. Click **Save**

#### Google Sign-In:
1. In **Authentication** → **Sign-in method**
2. Click on **Google**
3. Enable **Google** provider
4. Add your project's support email
5. Click **Save**

### 3. Configure Authorized Domains
1. In **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for development)
   - `127.0.0.1` (for development)
   - Your production domain (when deployed)

### 4. Enable Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location close to you
5. Click **Done**

### 5. Enable Storage
1. Go to **Storage**
2. Click **Get started**
3. Choose **Start in test mode** (for development)
4. Select a location close to you
5. Click **Done**

## 🚀 Quick Test

After completing the setup:
1. Restart your development server: `npm start`
2. Try signing up with a test email
3. Check the Firebase Console for new users

## 🔧 Alternative: Use Demo Mode

If you want to test the app without Firebase setup, the app includes a demo mode that bypasses authentication.
