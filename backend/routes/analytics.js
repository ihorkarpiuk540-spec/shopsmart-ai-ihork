const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabase');

router.get('/dashboard', async (req, res) => {
  try {
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    res.json({
      success: true,
      data: {
        totalProducts: totalProducts || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;