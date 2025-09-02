// Simple logger utility
const logger = {
  info: (message, data = '') => {
    console.log(`ℹ️  INFO: ${message}`, data);
  },

  error: (message, error = '') => {
    console.error(`❌ ERROR: ${message}`, error);
  },

  warn: (message, data = '') => {
    console.warn(`⚠️  WARN: ${message}`, data);
  },

  success: (message, data = '') => {
    console.log(`✅ SUCCESS: ${message}`, data);
  },

  debug: (message, data = '') => {
    console.log(`🐛 DEBUG: ${message}`, data);
  }
};

module.exports = logger;