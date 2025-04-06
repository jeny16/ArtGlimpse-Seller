import { storage, Permission, Role, ID } from 'appwrite';

export const uploadImageToAppwrite = async (file) => {
  try {
    const response = await storage.createFile(
      '67f226020009ef702b5c', // Your bucket ID
      ID.unique(),             // Use Appwrite's built-in unique ID generator
      file,
      [Permission.read(Role.any())]  // Grants public read access
    );
    return response.$id;
  } catch (error) {
    console.error('Appwrite storage error:', error);
    throw new Error('Image upload failed: ' + error.message);
  }
};
