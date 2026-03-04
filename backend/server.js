require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendations');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// List all products
app.get('/api/products/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({ success: true, products: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use('/api/recommendations', recommendationRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'ShopSmart AI Backend Running!' });
});


// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for ShopSmart, an e-commerce platform that provides AI-powered product recommendations. Help users with questions about products, recommendations, and e-commerce best practices.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    
    res.json({ success: true, reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});