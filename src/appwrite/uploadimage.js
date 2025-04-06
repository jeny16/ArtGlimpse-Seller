import { storage, generateUniqueId } from './appwriteConfig';

const uploadImage = async (file) => {
  try {
    const response = await storage.createFile(
      '67f226020009ef702b5c',  // Replace with your Appwrite bucket ID
      generateUniqueId(), 
      file
    );
    // Option 1: Return the file ID (you can generate the preview URL later)
    return response.$id;
    // Option 2: Generate a preview URL if needed:
    // const previewUrl = storage.getFilePreview('[BUCKET_ID]', response.$id);
    // return previewUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
