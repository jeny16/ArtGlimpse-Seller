import { storage } from './appwriteConfig';

// Async function to upload image to Appwrite
const uploadImageToAppwrite = async (file) => {
  try {
    const response = await storage.createFile(
      '67f226020009ef702b5c', // Your bucket ID
      generateUniqueId(),      // Unique file ID
      file
    );
    return response.$id;
  } catch (error) {
    console.error('Appwrite storage error:', error);
    throw new Error('Image upload failed: ' + error.message);
  }
};
