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

// Universal Responsive Header Optimization: prevent word wrapping and expand menu breakpoint to 1180px
const headerStyle = document.createElement('style');
headerStyle.textContent = `
  .header-links a {
    white-space: nowrap !important;
  }
  @media (max-width: 1180px) {
    .mobile-menu-btn {
      display: block !important;
      font-size: 24px;
      cursor: pointer;
      color: #fff;
    }
    .header-links {
      position: absolute !important;
      top: 55px !important;
      left: 0 !important;
      width: 100% !important;
      background: rgba(15, 23, 42, 0.98) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      flex-direction: column !important;
      text-align: center !important;
      gap: 20px !important;
      padding: 25px 0 !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
      display: flex !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateY(-15px) !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      pointer-events: none !important;
      z-index: 9999 !important;
    }
    .header-links.show {
      visibility: visible !important;
      opacity: 1 !important;
      transform: translateY(0) !important;
      pointer-events: auto !important;
    }
    .header-links a {
      margin: 0 !important;
      font-size: 17px !important;
      font-weight: 600 !important;
    }
  }
`;
document.head.appendChild(headerStyle);

// Guarantee global fallback toggle for mobile hamburger menu
window.toggleMobileMenu = window.toggleMobileMenu || function() {
  const menu = document.querySelector('.header-links');
  if (menu) menu.classList.toggle('show');
};

// Handle PWA BeforeInstallPrompt event to provide an intuitive in-app install button
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67+ and Edge from automatically showing the prompt or silently hiding it
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  // Create a floating Install Desktop App button if it doesn't already exist
  if (!document.getElementById('sendly-pwa-install-btn')) {
    const installBtn = document.createElement('button');
    installBtn.id = 'sendly-pwa-install-btn';
    installBtn.innerHTML = `
      <svg style="width:18px;height:18px;vertical-align:middle;margin-right:8px;fill:currentColor;" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
      Install Sendly App
    `;
    installBtn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: linear-gradient(135deg, #4e72fb 0%, #3550c6 100%);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 12px 22px;
      border-radius: 50px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(78, 114, 251, 0.45), 0 4px 12px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      backdrop-filter: blur(12px);
    `;

    installBtn.onmouseover = () => {
      installBtn.style.transform = 'translateY(-4px) scale(1.04)';
      installBtn.style.boxShadow = '0 15px 32px rgba(78, 114, 251, 0.65), 0 6px 16px rgba(0, 0, 0, 0.45)';
    };
    installBtn.onmouseout = () => {
      installBtn.style.transform = 'translateY(0) scale(1)';
      installBtn.style.boxShadow = '0 10px 25px rgba(78, 114, 251, 0.45), 0 4px 12px rgba(0, 0, 0, 0.35)';
    };

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      // Show the native browser installation prompt dialog
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again
      deferredPrompt = null;
      installBtn.remove();
    });

    document.body.appendChild(installBtn);
  }
});

// Remove button if app is installed or running in standalone desktop mode
window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('sendly-pwa-install-btn');
  if (btn) btn.remove();
  console.log('Sendly successfully installed as Desktop PWA!');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  const btn = document.getElementById('sendly-pwa-install-btn');
  if (btn) btn.remove();
}
