# 🚀 User Management Dashboard

A modern, full-stack user management application built with Next.js, TypeScript, Tailwind CSS, and Firestore. Features a beautiful UI with complete CRUD operations, real-time search, sorting, and filtering capabilities.

![User Management Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=for-the-badge&logo=firebase)

## 🎥 Video Demo

Watch a short demo of the full-stack dashboard application, including:

- Live CRUD operations (Create, Read, Update, Delete)
- Responsive dashboard UI
- Docker-based local deployment

📺 **Demo Video Link:**  
[Click to Watch on Google Drive](https://drive.google.com/file/d/1EtwkaQNvbPdfHqC2ye65XjLS4xeWPj1I/view?usp=sharing)
## 🚀 Live Demo

Check out the live deployed version on Vercel:

🔗 [User Dashboard - Live Demo](https://vercel.com/ritesh-jadhavs-projects/user-dashboard/3PYfpDnvriw1Kck5A3bLiDE95TMR)


## ✨ Features

### 🎯 Core Functionality
- **Complete CRUD Operations** - Create, read, update, and delete users
- **Real-time Search** - Instant search by name or email
- **Advanced Filtering** - Filter by role and status
- **Smart Sorting** - Click any column header to sort
- **Responsive Design** - Works perfectly on all devices

### 🎨 Modern UI/UX
- **Clean Table Interface** - Organized data display
- **Colorful Dashboard Stats** - Visual overview of user metrics
- **Status Badges** - Color-coded active/inactive indicators
- **Role Management** - Clean role badges (Admin, Manager, User)
- **Smooth Animations** - Hover effects and transitions

### 🔧 Technical Features
- **TypeScript** - Full type safety
- **Firestore Integration** - Real-time database
- **Docker Support** - Easy deployment
- **API Documentation** - Complete REST API
- **Error Handling** - Comprehensive error management

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Firebase/Firestore** - NoSQL database
- **Real-time Updates** - Live data synchronization

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- Docker (optional)

### 1. Clone & Install
\`\`\`bash
git clone <your-repo-url>
cd user-management-dashboard
npm install
\`\`\`

### 2. Firebase Setup

**Create Firebase Project:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Firestore Database
4. Get your config from Project Settings

**Set Environment Variables:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Update `.env.local`:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🐳 Docker Deployment

### Option 1: Simple Docker
\`\`\`bash
npm run docker:build
npm run docker:run
\`\`\`

### Option 2: Docker Compose (Recommended)
\`\`\`bash
npm run docker:compose
\`\`\`

This starts:
- Next.js app on port 3000
- Nginx reverse proxy on port 80

## 📁 Project Structure

\`\`\`
user-management-dashboard/
├── 📱 app/
│   ├── components/          # React components
│   │   ├── UserDashboard.tsx    # Main dashboard
│   │   ├── UserList.tsx         # Table with search/sort
│   │   └── UserForm.tsx         # Create/edit form
│   ├── api/                 # API routes
│   │   └── users/              # User CRUD endpoints
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page
├── 🔧 lib/
│   └── firebase.ts         # Firebase config
├── 🛠️ services/
│   └── firestoreService.ts # Database operations
├── 📝 types/
│   └── user.ts            # TypeScript interfaces
├── 🐳 Docker files
├── 📚 Documentation
└── 🔧 Config files
\`\`\`

## 🎯 How to Use

### Dashboard Overview
- **Total Users** - Blue card showing user count
- **Active Users** - Green card with active user count  
- **Inactive Users** - Red card with inactive user count

### Managing Users

**➕ Add New User:**
1. Click "Add User" button
2. Fill in name, email, role, and status
3. Click "Create" - user appears instantly

**✏️ Edit User:**
1. Click edit icon (pencil) on any row
2. Modify fields in the form
3. Click "Update" - changes reflect immediately

**🗑️ Delete User:**
1. Click delete icon (trash) on any row
2. Confirm in the dialog
3. User removed from table and database

### Search & Filter

**🔍 Search:**
- Type in search box to find users by name or email
- Results update instantly as you type

**🎛️ Filters:**
- **Status Filter:** Show only active or inactive users
- **Role Filter:** Filter by admin, manager, or user roles
- **Clear Filters:** Reset all filters with one click

**📊 Sorting:**
- Click any column header to sort
- Click again to reverse order
- Visual arrows show current sort direction

## 🔌 API Usage

The app provides a complete REST API. See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) for full details.

### Quick Examples

**Get all users:**
\`\`\`bash
curl http://localhost:3000/api/users
\`\`\`

**Create user:**
\`\`\`bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "role": "user",
    "status": "active"
  }'
\`\`\`

**Update user:**
\`\`\`bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
\`\`\`

**Delete user:**
\`\`\`bash
curl -X DELETE http://localhost:3000/api/users/1
\`\`\`

## 🎨 UI Components

### Status Badges
- **🟢 Active** - Green background
- **🔴 Inactive** - Red background

### Role Badges  
- **Admin** - Outline badge
- **Manager** - Outline badge
- **User** - Outline badge

### Interactive Elements
- **Hover Effects** - Smooth transitions on buttons and rows
- **Loading States** - Skeleton loading for better UX
- **Responsive Design** - Mobile-first approach

## 🔧 Configuration

### Environment Variables
\`\`\`env
# Firebase (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Optional
NODE_ENV=development
\`\`\`

### Firestore Rules
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{document} {
      allow read, write: if true; // Adjust for production
    }
  }
}
\`\`\`

## 🚀 Deployment Options

### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Docker Production
\`\`\`bash
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🛠️ Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run docker:build # Build Docker image
npm run docker:run   # Run Docker container
npm run docker:compose # Start with Docker Compose
\`\`\`

### Adding New Features

**1. Add new user field:**
- Update `types/user.ts`
- Modify `UserForm.tsx`
- Update `UserList.tsx`
- Adjust API routes

**2. Add new filter:**
- Update `UserList.tsx` state
- Add filter UI component
- Modify filtering logic

## 🔍 Troubleshooting

### Common Issues

**🔥 Firebase Connection:**
\`\`\`bash
# Check environment variables
echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID

# Verify Firestore rules
# Check Firebase console for errors
\`\`\`

**🐳 Docker Issues:**
\`\`\`bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
\`\`\`

**📦 Dependencies:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

**⚠️ Version Compatibility Issues:**

If you encounter version conflicts with React, date-fns, or react-day-picker, run these commands to fix compatibility:

\`\`\`bash
# Uninstall conflicting packages
npm uninstall react react-dom date-fns react-day-picker

# Install specific compatible versions
npm install react@18 react-dom@18
npm install date-fns@2.29.3
npm install react-day-picker@8.10.1
\`\`\`

**Common version error symptoms:**
- Build failures with React version mismatches
- Date picker component errors
- TypeScript type conflicts
- Runtime errors related to React hooks

**After fixing versions:**
\`\`\`bash
# Clear cache and restart
rm -rf .next
npm run dev
\`\`\`

### Debug Mode
\`\`\`bash
# Enable debug logging
DEBUG=* npm run dev
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Firebase](https://firebase.google.com/) - Backend services
- [Lucide](https://lucide.dev/) - Beautiful icons

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Firestore**

For questions or support, please open an issue on GitHub.
