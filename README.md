---

# Image Management Application

This Image Management Application allows users to register, log in, and manage their images by adding titles, editing, deleting, and rearranging them with drag-and-drop functionality. Built with a React (TypeScript) frontend and Node.js (TypeScript) backend using a layered architecture and MongoDB for data storage, the app enables bulk uploads and user-specific image management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)

## Overview

The application offers a platform for users to register, log in, and manage their images with features such as adding, viewing, rearranging, editing, and deleting. Each uploaded image can have a specific title, and users can manage the order of their images with drag-and-drop functionality.

## Features

### 1. User Registration and Login
- Register a new user with Email ID, Phone number, and password.
- User can log in to the application.
- Password reset functionality available.

### 2. Image Management
- **Add Image with Title:** Users can upload multiple images simultaneously, each with a specific title.
- **View Uploaded Images:** Users can view their uploaded images along with their respective titles.

### 3. Edit and Delete Images
- Users can edit both the image and title of their uploads.
- A delete option is available to remove unwanted images.

### 4. Rearrange Images
- **Drag-and-Drop Rearrangement:** Users can rearrange their uploaded images with a drag-and-drop interface.
- **Save Rearranged Order:** Changes to the order can be saved, and images will display in the new arrangement.

## Architecture

This application follows a layered architecture with separate layers for managing different aspects of the backend:

- **Presentation Layer**: Handles routing and controllers, processing requests from the frontend.
- **Application Layer**: Contains business logic for user management and image processing.
- **Domain Layer**: Contains the core models (User, Image) and entities.
- **Infrastructure Layer**: Manages the connection with MongoDB and data access.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/image-management-app.git
   cd image-management-app
   ```

2. **Backend Setup**
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables by creating a `.env` file in the backend root:
     ```dotenv
     PORT=4000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     FRONTEND_URL=http://localhost:3000  # or your deployed frontend URL
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables in a `.env` file in the frontend root:
     ```dotenv
     REACT_APP_BACKEND_URL=http://localhost:4000/api
     ```
   - Start the frontend:
     ```bash
     npm run start
     ```

## Usage

1. **Register a New User**: Go to the registration page, fill in your details, and register.
2. **Log In**: Log in with your email and password.
3. **Upload Images**: Add images with a title for each image (supports bulk uploads).
4. **Edit & Delete**: Use the edit option to modify the image and title or delete unwanted images.
5. **Rearrange Images**: Drag and drop images to rearrange the order and save the new arrangement.

## Technologies

- **Frontend**: React (TypeScript), Tailwind CSS
- **Backend**: Node.js (TypeScript), Express
- **Database**: MongoDB
- **Others**: JWT for authentication, Multer for handling image uploads

## Folder Structure

### Backend

```plaintext
backend/
├── src/
│   ├── application/           # Business logic (image & user management)
│   ├── domain/                # Core models (User, Image)
│   ├── infrastructure/        # Database connection, MongoDB configuration
│   ├── interfaces/            # Controllers and routes
│   └── main.ts                # Application entry point
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

### Frontend

```plaintext
frontend/
├── uploads/                    # Static assets
├── src/
│   ├── components/            # UI components
│   ├── pages/                 # App pages (login, register, image management)
│   ├── services/              # API service functions
│   └── App.tsx                # Main app component
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the Akil License.

---
