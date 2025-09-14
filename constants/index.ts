// App-wide constants for the AVAX frontend application

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.avalanche.network',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  CHAIN_ID: 43114, // Avalanche Mainnet
  CHAIN_NAME: 'Avalanche Network',
  RPC_URL: 'https://api.avax.network/ext/bc/C/rpc',
  EXPLORER_URL: 'https://snowtrace.io',
  NATIVE_TOKEN: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
} as const;

// UI Constants
export const UI_CONFIG = {
  MAX_WIDTH: '1200px',
  HEADER_HEIGHT: '64px',
  SIDEBAR_WIDTH: '256px',
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  SWAP: '/swap',
  PORTFOLIO: '/portfolio',
  ANALYTICS: '/analytics',
  ABOUT: '/about',
} as const;

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  ANALYTICS: true,
  NOTIFICATIONS: true,
  BETA_FEATURES: process.env.NODE_ENV === 'development',
} as const;

// Default Values
export const DEFAULTS = {
  SLIPPAGE_TOLERANCE: '0.5', // 0.5%
  DEADLINE_MINUTES: 20,
  GAS_PRICE: 'standard',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  WALLET_NOT_CONNECTED: 'Please connect your wallet first.',
} as const;