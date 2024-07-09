const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGODB_URI)

app.post('/api/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/api/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/api/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/api/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      image:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/api/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const { id, title, summary, content } = req.body;
  
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            title,
            summary,
            content,
            image: newPath || req.body.image, 
          },
          { new: true } 
        );
  
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        res.json(updatedPost);
      } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  
  

app.get('/api/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});
app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    let filter = {};
  
    if (query) {
      const searchRegex = new RegExp(query, 'i'); 
      filter.$or = [
        { title: searchRegex },
      ];
    }
  
    try {
      if (query) {
        const user = await User.findOne({ username: query });
        if (user) {
          filter.$or.push({ author: user._id });
        }
      }
  
      const posts = await Post.find(filter).populate('author', ['username']);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts" });
    }
  });
  
  
app.get('/api/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.delete('/api/post/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const imagePath = `${__dirname}/${deletedPost.image}`;
      fs.unlinkSync(imagePath);
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });