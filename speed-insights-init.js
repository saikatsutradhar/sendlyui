// Vercel Speed Insights initialization
// This file loads and initializes Vercel Speed Insights for the static site

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights
injectSpeedInsights({
  debug: false, // Set to true for debugging in development
});
