// Simple socket server mock
const socketServer = {
  init: (server) => {
    console.log('🔌 Socket server initialized');
    // Mock initialization - in real app this would set up socket.io
  },

  emitToRiders: (event, data) => {
    console.log(`📡 Emitting to riders: ${event}`, data);
    // Mock implementation - in real app this would emit to connected riders
  },

  emitToCustomer: (event, data, customerId) => {
    console.log(`📡 Emitting to customer ${customerId}: ${event}`, data);
    // Mock implementation - in real app this would emit to specific customer
  },

  broadcast: (event, data) => {
    console.log(`📡 Broadcasting: ${event}`, data);
    // Mock implementation - in real app this would broadcast to all connected clients
  }
};

module.exports = socketServer;