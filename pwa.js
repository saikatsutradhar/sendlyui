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

// Map of modern high-end SVG icons for navigation items
const navIcons = {
  "home": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  "how it works": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  "screen share": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  "local drop": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  "live notepad": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  "diff checker": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  "json formatter": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  "json cracker": `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`
};

// Inject universal header layout normalization and modern navigation styling
const headerStyle = document.createElement('style');
headerStyle.textContent = `
  /* Universal Header Standardization to match exact Local Drop proportions across all pages */
  .header {
    width: 100% !important;
    height: 64px !important;
    min-height: 64px !important;
    max-height: 64px !important;
    padding: 0 4% !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    background: rgba(11, 15, 25, 0.75) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 100 !important;
  }
  .header-logo {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    text-decoration: none !important;
    height: 100% !important;
    flex-shrink: 0 !important;
  }
  .header-logo img {
    height: 38px !important;
    width: auto !important;
    max-height: 38px !important;
    object-fit: contain !important;
  }

  .header-links {
    flex-shrink: 0 !important;
    margin: 0 !important;
  }

  .header-links a {
    white-space: nowrap !important;
    margin: 0 !important;
  }
  .nav-ico {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  /* Desktop Navigation Enhancements - Compact, sleek spacing with zero doubled margins */
  @media (min-width: 1181px) {
    .mobile-menu-btn {
      display: none !important;
    }
    .header-links {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
    }
    .header-links a {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      padding: 6px 10px !important;
      border-radius: 8px !important;
      font-size: 13.5px !important;
      font-weight: 500 !important;
      color: rgba(255, 255, 255, 0.8) !important;
      transition: all 0.25s ease !important;
      border: 1px solid transparent !important;
      text-decoration: none !important;
      margin: 0 !important;
    }
    .header-links a:hover {
      color: #ffffff !important;
      background: rgba(78, 114, 251, 0.12) !important;
      border-color: rgba(78, 114, 251, 0.3) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(78, 114, 251, 0.2) !important;
    }
    .header-links a.active {
      color: #ffffff !important;
      background: rgba(78, 114, 251, 0.2) !important;
      border-color: rgba(78, 114, 251, 0.5) !important;
      box-shadow: 0 4px 15px rgba(78, 114, 251, 0.35) !important;
    }
    .header-links a::after {
      display: none !important;
    }
  }

  /* Ultra-Modern Responsive Floating Sheet / Glassmorphism Card Grid */
  @media (max-width: 1180px) {
    .mobile-menu-btn {
      display: block !important;
      font-size: 24px !important;
      cursor: pointer !important;
      color: #fff !important;
      z-index: 10000 !important;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    .mobile-menu-btn:hover {
      transform: scale(1.15);
    }
    .header-links {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: radial-gradient(circle at 90% 10%, rgba(78, 114, 251, 0.28), transparent 45%), rgba(7, 10, 24, 0.94) !important;
      backdrop-filter: blur(32px) !important;
      -webkit-backdrop-filter: blur(32px) !important;
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
      align-content: center !important;
      gap: 16px !important;
      padding: 90px 8% 60px !important;
      overflow-y: auto !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: scale(0.95) translateY(-10px) !important;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
      pointer-events: none !important;
      z-index: 9999 !important;
      border: none !important;
      box-shadow: none !important;
    }
    .header-links.show {
      visibility: visible !important;
      opacity: 1 !important;
      transform: scale(1) translateY(0) !important;
      pointer-events: auto !important;
    }
    .header-links a {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 18px !important;
      padding: 18px 24px !important;
      background: rgba(255, 255, 255, 0.04) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 20px !important;
      color: rgba(255, 255, 255, 0.88) !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      text-decoration: none !important;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3) !important;
      margin: 0 !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .header-links a .nav-ico {
      width: 22px;
      height: 22px;
      padding: 10px;
      background: rgba(78, 114, 251, 0.15);
      border-radius: 14px;
      border: 1px solid rgba(78, 114, 251, 0.3);
      color: #6695FF;
      box-sizing: content-box;
      transition: all 0.3s ease;
    }
    .header-links a:hover, .header-links a.active {
      background: linear-gradient(135deg, rgba(78, 114, 251, 0.28), rgba(53, 80, 198, 0.18)) !important;
      border-color: rgba(78, 114, 251, 0.65) !important;
      color: #ffffff !important;
      transform: translateY(-4px) scale(1.02) !important;
      box-shadow: 0 14px 32px rgba(78, 114, 251, 0.4), 0 6px 18px rgba(0, 0, 0, 0.5) !important;
    }
    .header-links a:hover .nav-ico, .header-links a.active .nav-ico {
      background: #4e72fb !important;
      color: #ffffff !important;
      border-color: #799aff !important;
      transform: scale(1.1) rotate(-6deg) !important;
      box-shadow: 0 0 16px rgba(78, 114, 251, 0.9) !important;
    }
    /* Hide old plain underlines */
    .header-links a::after {
      display: none !important;
    }
  }
`;
document.head.appendChild(headerStyle);

// Automatically enrich navigation, move "How it works" to the very end of the series, and match Local Drop styling
const enrichNavigation = () => {
  let currentPath = window.location.pathname.toLowerCase().replace(/\/$/, '').replace(/\.html$/, '') || '/';
  const menu = document.querySelector('.header-links');
  
  if (menu) {
    // 1. Reorder navigation: Move "How it works" to the very end of the series
    const howItWorksLink = Array.from(menu.querySelectorAll('a')).find(
      a => (a.getAttribute('href') || '').toLowerCase().includes('how-it-works') || a.textContent.trim().toLowerCase().includes('how it works')
    );
    if (howItWorksLink) {
      menu.appendChild(howItWorksLink);
    }

    // 2. Ensure mobile hamburger button exists on all pages
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.mobile-menu-btn')) {
      const btn = document.createElement('div');
      btn.className = 'mobile-menu-btn';
      btn.innerHTML = '☰';
      btn.onclick = window.toggleMobileMenu;
      header.insertBefore(btn, menu);
    }
  }

  const links = document.querySelectorAll('.header-links a');
  links.forEach(link => {
    // Attach modern SVG icon if not present
    if (!link.querySelector('.nav-ico')) {
      const text = link.textContent.trim().toLowerCase();
      const iconHTML = navIcons[text] || `<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
      link.insertAdjacentHTML('afterbegin', iconHTML);
    }
    
    // Automatically highlight the current tool page with sapphire active style
    let linkPath = (link.getAttribute('href') || '').toLowerCase().replace(/\/$/, '').replace(/\.html$/, '') || '/';
    if (currentPath === linkPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enrichNavigation);
} else {
  enrichNavigation();
}

// Guarantee global fallback toggle for mobile hamburger menu
window.toggleMobileMenu = window.toggleMobileMenu || function() {
  const menu = document.querySelector('.header-links');
  if (menu) menu.classList.toggle('show');
};

// Handle PWA BeforeInstallPrompt event to provide an intuitive in-app install button
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
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
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      deferredPrompt = null;
      installBtn.remove();
    });

    document.body.appendChild(installBtn);
  }
});

window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('sendly-pwa-install-btn');
  if (btn) btn.remove();
  console.log('Sendly successfully installed as Desktop PWA!');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  const btn = document.getElementById('sendly-pwa-install-btn');
  if (btn) btn.remove();
}
