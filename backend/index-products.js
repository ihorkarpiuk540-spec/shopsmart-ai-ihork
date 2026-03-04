require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function indexProducts() {
  try {
    console.log('📦 Fetching products from database...');
    const { data: products, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    
    console.log(`Found ${products.length} products`);
    
    for (const product of products) {
      console.log(`\n🔄 Indexing: ${product.name}`);
      
      // Generate embedding
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: `${product.name} ${product.description || ''}`,
        dimensions: 1536,
      });
      
      // Update product with embedding
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          embedding: embedding.data[0].embedding,
          updated_at: new Date().toISOString()
        })
        .eq('product_id', product.product_id);
      
      if (updateError) {
        console.error(`❌ Failed to update ${product.name}:`, updateError.message);
      } else {
        console.log(`✅ Indexed: ${product.name}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n✅ All products indexed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

indexProducts();