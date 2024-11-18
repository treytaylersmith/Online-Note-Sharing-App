const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const axios = require('axios');

dotenv.config();



const port = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
const cors = require('cors'); // Import CORS
app.use(cors({ origin: "http://localhost:3000" }));

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  
 
  
  app.post('/api/chat', async (req, res) => {
    const { messages } = req.body; // Expecting chat history
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini', // Or 'gpt-4'
          messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use your environment variable
          },
        }
      );
  
      res.json(response.data.choices[0].message); // Send back the bot's response
    } catch (error) {
      console.error('Error with OpenAI API:', error.response?.data || error.message);
      res.status(500).json({ error: 'An error occurred while communicating with OpenAI.' });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
      console.log(`Use GraphQL at http://localhost:${port}/graphql`);
    });
  });
};
startApolloServer();
