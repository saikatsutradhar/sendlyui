// Register Service Worker for PWA Installation and Windows Desktop app support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Sendly PWA ServiceWorker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('ServiceWorker registration failed:', error);
    });
  });
}
