/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const admin = require('firebase-admin');
const serviceAccount = require('./portfolio-r-3bf6e-firebase-adminsdk-s4j5q-ca664dd756.json');
// const fs = require('fs');
const path = require('path');

const app = express();
const router = express.Router();
const port = 3000;
const API_URL = "https://api.core.ac.uk";

const APIKey = process.env.VITE_CORE_API_KEY;
const cors = require('cors');
app.use(cors({ origin: true }));
app.use('/api', router);
app.use(express.json());  // Add this line to parse JSON bodies

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-r-3bf6e-default-rtdb.firebaseio.com"
});
const db = admin.firestore();


router.get("/papers/search", async (req, res) => {
    const searchQuery = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
  
    try {
      const result = await axios.get(`${API_URL}/v3/search/works/`, {
        params: {
          q: searchQuery,
          scroll: true,
          offset: offset,
          limit: limit
        },
        headers: {
          'Authorization': `Bearer ${APIKey}`
        }
      });
  
      const papers = result.data.results.map(item => ({
        title: item.title,
        abstract: item.abstract,
        yearPublished: item.yearPublished,
        downloadUrl: item.downloadUrl,
        documentType: item.documentType,
        readerUrl: item.links.find(link => link.type === "reader")?.url
      }));
  
      res.json({
        papers,
        currentPage: page,
        totalPages: Math.ceil(result.data.totalHits / limit),
        totalResults: result.data.totalHits
      });
    } catch (error) {
      logger.error('Search error', { error: error.message });
      res.status(404).json({ error: error.message });
    }
  });

  router.get("/blog", async (req, res) => {
    try {
      const postsSnapshot = await db.collection('posts')
        .orderBy('date', 'desc')
        .get();
      
      const posts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: error.message });
    }
  });

router.post("/blog", express.json(), async (req, res) => {
  try {
    const { name, content } = req.body;
    const docRef = await db.collection('posts').add({
      name,
      content,
      date: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ id: docRef.id, message: 'Post created successfully' });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    await db.collection('posts').doc(req.params.id).delete();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const postDoc = await db.collection('posts').doc(req.params.id).get();
    if (!postDoc.exists) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json({ id: postDoc.id, ...postDoc.data() });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/blog/:id", express.json(), async (req, res) => {
  try {
    const { name, content } = req.body;
    await db.collection('posts').doc(req.params.id).update({ name, content });
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/location-audit", express.json(), async (req, res) => {
  try {
    const emailLocationsMap = req.body;
    const docRef = await db.collection('locationAudits').add({
      data: emailLocationsMap,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ id: docRef.id, message: 'Data saved successfully' });
  } catch (error) {
    console.error("Error saving location audit:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/leaderboard", express.json(), async (req, res) => {
  try {
    const { name, score } = req.body;
    const docRef = await db.collection('leaderboard').add({
      name,
      score,
      date: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ id: docRef.id, message: 'Score saved successfully' });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboardSnapshot = await db.collection('leaderboard')
      .orderBy('score', 'desc')
      .limit(10)
      .get();
    
    const leaderboard = leaderboardSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      score: doc.data().score,
      date: doc.data().date
    }));
    
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: error.message });
  }
});

exports.api = onRequest({
    memory: '256MiB',  // Optional: Specify memory allocation
    timeoutSeconds: 60,  // Optional: Specify timeout
    cors: true  // Enable CORS for the function
  }, app);