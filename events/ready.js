module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      console.log(`${client.user.tag} is now online!`);

      // Example data fetching with proper error handling
      const someData = await getSomeData();

      if (!someData || !someData.ids) {
        throw new Error('someData or someData.ids is null');
      }

      // console.log('IDs:', someData.ids);
    } catch (error) {
      console.error('Error in ready event handler:', error);
    }
  },
};

// Mock function for demonstration; replace with your actual function
async function getSomeData() {
  // Simulate fetching data that might be null
  return {
    ids: [1, 2, 3], // Ensure this is not null
  };
}
