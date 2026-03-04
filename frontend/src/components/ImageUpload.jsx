import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://npwxupenjqhhlubvlbjk.supabase.co',
  import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_RyanZNe8qdrgIwZGd87O1w_MRkaf1i6'
);

function ImageUpload({ productId, onImageUploaded, currentImage }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  async function handleFileChange(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setUploading(true);

      // Create unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Update product in database
      const { error: updateError } = await fetch('http://localhost:3001/api/products/update-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          imageUrl: publicUrl
        })
      });

      if (updateError) throw updateError;

      setPreview(publicUrl);
      if (onImageUploaded) onImageUploaded(publicUrl);
      
      alert('Image uploaded successfully!');

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={() => {
              setPreview(null);
              if (onImageUploaded) onImageUploaded(null);
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-5">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-500">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

export default ImageUpload;