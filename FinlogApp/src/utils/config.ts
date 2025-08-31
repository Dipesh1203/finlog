// Configuration for the FinLog app

// Backend API Configuration
export const API_CONFIG = {
  // Update this URL with your backend server address
  // For local development, use your computer's IP address instead of localhost
  // Example: 'http://192.168.1.100:8081' if your computer's IP is 192.168.1.100
  BASE_URL: 'http://localhost:8081',
  TIMEOUT: 10000,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'FinLog',
  VERSION: '1.0.0',
};

// Categories for expenses (you can modify these)
export const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Personal Care',
  'Other',
];