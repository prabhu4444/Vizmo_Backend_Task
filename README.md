### Blog Post CRUD Operations
This project implements REST API endpoints to handle blog post CRUD operations using the MERN stack. The frontend is built with Vite and TailwindCSS, while the backend is implemented with MongoDB, Node.js, and Express. Authentication for user login and signup is also included.

## Note :
Time taken to complete the task : 24hrs (from first commmit to the final demo video)

## Demo
A demo video of the project can be found here...


https://github.com/prabhu4444/Vizmo_Backend_Task/assets/61291869/be2bc4b6-82e8-47d2-8998-ee56a4dfb400



## Features
# User Authentication
- User login(sign-in) and registration(sign-up)

  
# REST API Endpoints
- (GET) Get all blog posts
- (GET) Get details of a single blog post
- (POST) Create a new blog post
- (DELETE) Delete an existing blog post (Only the auther can delete the post)
- (PUT) Update an existing blog post
- (GET) Get a filtered list of posts (filter by title, author)
  
# Schema
- Blog Post
```
{
  "title" : String,
  "summary" : String,
  "content" : String,
  "image" : String,
  "author" : Schema.Types.ObjectId, ref:'User'
}
```
- User (Author)
```
{
  "username": "string",
  "password": "string"
}
```

## Tech Stack
# Frontend:
- Vite
- React
- TailwindCSS

# Backend:
- Node.js
- Express
- MongoDB

##Environment Variables
The .env file contains the following environment variable:
```
MONGODB_URI: Your URL for connecting to the MongoDB Atlas database.
```
## Installation
- Clone the repository.
- Install dependencies for both frontend and backend:
- Navigate to the client directory and run npm install.
- Navigate to the server directory and run npm install.
- Create a .env file in the server directory and add your MongoDB URL.
- Running the Application
- To run the frontend and backend:
- Navigate to the client directory and run npm run dev to start the frontend server.
- Navigate to the server directory and run npm run dev to start the backend server.

The application will be available at(default):
- Frontend: http://localhost:5173/
- Backend: http://localhost:4000

## Proxy Configuration
To run both frontend and backend on the same laptop, the Vite config includes the following proxy configuration:
```
server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
},
```









