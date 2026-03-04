const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabase');
const { generateEmbedding } = require('../utils/openai');

router.post('/get', async (req, res) => {
  try {
    const { productId } = req.body;
    
    // MOCK DATA - Replace with real AI when you have quota
    const mockRecommendations = [
      {
        product_id: 'test-2',
        name: 'Bluetooth Earbuds Pro',
        description: 'Compact wireless earbuds with premium sound',
        price: 79.99,
        similarity: 0.94
      },
      {
        product_id: 'test-3',
        name: 'Over-Ear Studio Headphones',
        description: 'Professional over-ear headphones for music',
        price: 149.99,
        similarity: 0.89
      },
      {
        product_id: 'test-4',
        name: 'Sports Wireless Earphones',
        description: 'Sweat-resistant earphones for workouts',
        price: 59.99,
        similarity: 0.85
      }
    ];
    
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({ 
      success: true, 
      recommendations: mockRecommendations,
      note: 'Mock data - add OpenAI billing for real AI'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/index', async (req, res) => {
  try {
    const { productId, productName, productDescription, price } = req.body;
    
    const embedding = await generateEmbedding(`${productName} ${productDescription || ''}`);
    
    const { data, error } = await supabase
      .from('products')
      .upsert({
        product_id: productId,
        name: productName,
        description: productDescription || '',
        price: price || 0,
        embedding: embedding,
        updated_at: new Date().toISOString(),
      })
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, message: 'Product indexed', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

// Update product image
router.post('/update-image', async (req, res) => {
  try {
    const { productId, imageUrl } = req.body;
    
    const { data, error } = await supabase
      .from('products')
      .update({ 
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('product_id', productId)
      .select();
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});