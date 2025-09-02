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

const safeLog = (level, message, data = '') => {
  try {
    if (level === 'error') {
      console.error(`❌ ${message}`, data);
    } else {
      console.log(`📝 ${message}`, data);
    }
  } catch (err) {
    console.log('Logging error:', err);
  }
};

module.exports = { ...logger, safeLog };