import { Client, Storage, ID, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67f225d6001b11e422b8');         // Your Appwrite project ID

// Create Account and Storage instances
export const account = new Account(client);
export const storage = new Storage(client);
export const generateUniqueId = ID.unique;

// Optional: Automatically create an anonymous session if no session exists
(async () => {
  try {
    await account.get(); // Check if session exists
  } catch (error) {
    // If not logged in, create anonymous session for testing
    try {
      await account.createAnonymousSession();
      console.log('Anonymous session created');
    } catch (err) {
      console.error('Failed to create anonymous session:', err);
    }
  }
})();
