// components.js - Shared website components with mobile menu

// Theme is now set directly in each HTML file

const SiteComponents = {
  // Shared header component (keeping original layout)
  header: `
    <header>
      <h1><a href="index.html" id="header-title">Welcome to Bernds Homepage</a></h1>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
      </button>
      <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </header>
    <nav id="main-nav">
      <a href="index.html" class="nav-link" data-page="home">Home</a>
      <a href="about.html" class="nav-link" data-page="about">About</a>
      <a href="projects.html" class="nav-link" data-page="projects">Projects</a>
      <a href="mnemonics.html" class="nav-link" data-page="mnemonics">Mnemonics</a>
      <a href="postgres.html" class="nav-link" data-page="postgres">Postgres</a>
      <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
      <div class="mobile-theme-toggle">
        <button id="mobile-theme-toggle" class="nav-link theme-toggle-mobile" aria-label="Toggle theme">
          <span class="mobile-theme-icon">🌙</span> Theme
        </button>
      </div>
    </nav>
  `,
  
  // CSS styles for mobile menu (keeps original layout on desktop)
  styles: `
    <style>
      /* Header title link styling */
      #header-title {
        color: inherit;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      #header-title:hover {
        color: var(--link-color);
        text-decoration: none;
      }
      
      /* Theme toggle button */
      .theme-toggle {
        position: absolute;
        top: 1rem;
        right: 4rem;
        background: none;
        border: 2px solid var(--header-text);
        border-radius: 50%;
        width: 45px;
        height: 45px;
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--header-text);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .theme-toggle:hover {
        background-color: var(--nav-hover-bg);
        transform: scale(1.1);
      }

      .theme-toggle:focus {
        outline: 2px solid var(--nav-active-bg);
        outline-offset: 2px;
      }
      
      /* Mobile theme toggle */
      .mobile-theme-toggle {
        display: none;
      }
      
      .theme-toggle-mobile {
        background: none !important;
        border: none !important;
        text-align: left !important;
        cursor: pointer !important;
        color: var(--nav-text) !important;
      }
      
      /* Mobile menu toggle button - only visible on mobile */
      .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        z-index: 1000;
        position: absolute;
        right: 1rem;
        top: 1rem;
      }

      .hamburger-line {
        width: 25px;
        height: 3px;
        background-color: var(--text-color, #333);
        margin: 3px 0;
        transition: 0.3s;
        transform-origin: center;
      }

      /* Hamburger animation when active */
      .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }

      .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
        opacity: 0;
      }

      .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }

      /* Mobile styles only */
      @media (max-width: 768px) {
        .theme-toggle {
          display: none;
        }
        
        .mobile-theme-toggle {
          display: block;
          border-top: 1px solid var(--border-color, #eee);
          margin-top: 1rem;
          padding-top: 1rem;
        }
        
        .mobile-menu-toggle {
          display: flex;
        }

        nav {
          position: fixed;
          top: 0;
          left: -100%;
          width: 80%;
          height: 100vh;
          background-color: var(--bg-color, #fff);
          flex-direction: column;
          padding: 4rem 2rem 2rem;
          transition: left 0.3s ease-in-out;
          z-index: 999;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          display: flex;
        }

        nav.active {
          left: 0;
        }

        nav .nav-link {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color, #eee);
          margin-bottom: 0.5rem;
          display: block;
        }

        /* Overlay for mobile menu */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }
      }

      /* Dark mode adjustments */
      [data-theme="dark"] .hamburger-line {
        background-color: var(--text-color, #fff);
      }

      @media (max-width: 768px) {
        [data-theme="dark"] nav {
          background-color: var(--bg-color, #222);
        }
      }
    </style>
  `,
  
  // Shared footer component
  footer: `
    <footer>
      <p>&copy; 2025 Bernd Reiß</p>
    </footer>
  `,
  
  // Function to load all components
  load: function() {
    // Initialize theme first (before loading components)
    this.initTheme();
    
    // Load styles
    if (!document.getElementById('mobile-menu-styles')) {
      const styleElement = document.createElement('div');
      styleElement.id = 'mobile-menu-styles';
      styleElement.innerHTML = this.styles;
      document.head.appendChild(styleElement.firstElementChild);
    }
    
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = this.header;
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = this.footer;
    }
    
    // Set active navigation
    this.setActiveNavigation();
    
    // Setup theme toggle after components are loaded (if button exists)
    this.setupThemeToggle();
    
    // Setup mobile menu
    this.setupMobileMenu();
  },
  
  // Function to highlight current page in navigation
  setActiveNavigation: function() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const page = link.getAttribute('data-page');
      if ((currentPage === 'index' && page === 'home') || currentPage === page) {
        link.classList.add('active');
      }
    });
  },
  
  // Mobile menu functionality
  setupMobileMenu: function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    
    if (mobileToggle && mainNav) {
      // Create overlay element
      const overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      overlay.id = 'mobile-overlay';
      document.body.appendChild(overlay);
      
      // Toggle menu function
      const toggleMenu = () => {
        const isActive = mainNav.classList.contains('active');
        
        if (isActive) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      };
      
      // Event listeners
      mobileToggle.addEventListener('click', toggleMenu);
      overlay.addEventListener('click', () => this.closeMobileMenu());
      
      // Close menu when nav link is clicked (mobile)
      const navLinks = mainNav.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.closeMobileMenu();
          }
        });
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeMobileMenu();
        }
      });
    }
  },
  
  openMobileMenu: function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    const overlay = document.getElementById('mobile-overlay');
    
    mobileToggle.classList.add('active');
    mainNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  },
  
  closeMobileMenu: function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    const overlay = document.getElementById('mobile-overlay');
    
    mobileToggle.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
  },
  
  // Theme functionality - simplified
  initTheme: function() {
    // Theme was already set by immediate initialization
    // Nothing else needed here
  },
  
  setupThemeToggle: function() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        SiteComponents.toggleTheme();
      });
    }
    
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', function() {
        SiteComponents.toggleTheme();
      });
    }
    
    // Update icons immediately
    this.updateThemeIcon();
  },
  
  toggleTheme: function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update body background with !important to override inline CSS
    document.body.style.setProperty('background-color', newTheme === 'light' ? '#ffffff' : '#1a1a1a', 'important');
    
    // Save theme intelligently
    try {
      const systemTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
      
      if (newTheme === systemTheme) {
        // New theme matches system, remove local storage (use system)
        localStorage.removeItem('theme');
      } else {
        // New theme differs from system, save as override
        localStorage.setItem('theme', newTheme);
      }
    } catch (e) {
      // localStorage not available, just save normally
      localStorage.setItem('theme', newTheme);
    }
    
    // Update button icons
    SiteComponents.updateThemeIcon();
  },
  
  updateThemeIcon: function() {
    const themeIcon = document.querySelector('.theme-icon');
    const mobileThemeIcon = document.querySelector('.mobile-theme-icon');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    const iconText = currentTheme === 'dark' ? '☀️' : '🌙';
    const tooltipText = currentTheme === 'dark' ? 'Change to light mode' : 'Change to dark mode';
    
    if (themeIcon) {
      themeIcon.textContent = iconText;
    }
    
    if (mobileThemeIcon) {
      mobileThemeIcon.textContent = iconText;
    }
    
    // Update tooltips/titles
    if (themeToggle) {
      themeToggle.setAttribute('title', tooltipText);
      themeToggle.setAttribute('aria-label', tooltipText);
    }
    
    if (mobileThemeToggle) {
      mobileThemeToggle.setAttribute('title', tooltipText);
      mobileThemeToggle.setAttribute('aria-label', tooltipText);
    }
  }
};


// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  SiteComponents.load();
});
