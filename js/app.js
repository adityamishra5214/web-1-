/**
 * LIVY — Living Indian Voices and Yarns
 * Concept 02: Quietly Crafted
 * Core Application Logic & State Store
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentCurrency: 'INR',
    activeCollection: 'all',
    activeSort: 'curated',
    selectedProduct: null,
    selectedSizeId: 'queen',
    selectedQuantity: 1,
    activePdpImageIndex: 0,
    cart: [],
    discountCode: null,
    discountAmount: 0,
    isAudioPlaying: false,
    audioContext: null,
    ambientNodes: []
  };

  // DOM Elements
  const DOM = {
    brandCover: document.getElementById('brandCover'),
    btnEnterWorld: document.getElementById('btnEnterWorld'),
    btnSkipCover: document.getElementById('btnSkipCover'),
    btnNavStory: document.getElementById('btnNavStory'),
    btnAudioToggle: document.getElementById('btnAudioToggle'),
    audioPulse: document.getElementById('audioPulse'),
    audioText: document.getElementById('audioText'),
    mainHeader: document.getElementById('mainHeader'),
    currencySelect: document.getElementById('currencySelect'),
    productsGrid: document.getElementById('productsGrid'),
    collectionTabs: document.querySelectorAll('.collection-tab-btn'),
    catalogueSortSelect: document.getElementById('catalogueSortSelect'),
    cartBadgeCount: document.getElementById('cartBadgeCount'),
    btnCartTrigger: document.getElementById('btnCartTrigger'),
    cartDrawerBackdrop: document.getElementById('cartDrawerBackdrop'),
    btnCartClose: document.getElementById('btnCartClose'),
    cartItemsContainer: document.getElementById('cartItemsContainer'),
    cartSubtotalElem: document.getElementById('cartSubtotal'),
    cartDiscountElem: document.getElementById('cartDiscount'),
    cartShippingElem: document.getElementById('cartShipping'),
    cartTotalElem: document.getElementById('cartTotal'),
    shippingProgressFill: document.getElementById('shippingProgressFill'),
    shippingHintText: document.getElementById('shippingHintText'),
    btnApplyPromo: document.getElementById('btnApplyPromo'),
    promoInput: document.getElementById('promoInput'),
    btnProceedCheckout: document.getElementById('btnProceedCheckout'),
    checkoutModalBackdrop: document.getElementById('checkoutModalBackdrop'),
    btnCheckoutClose: document.getElementById('btnCheckoutClose'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutSuccessView: document.getElementById('checkoutSuccessView'),
    checkoutFormView: document.getElementById('checkoutFormView'),
    checkoutOrderRef: document.getElementById('checkoutOrderRef'),
    btnFinishOrder: document.getElementById('btnFinishOrder'),
    pdpModalBackdrop: document.getElementById('pdpModalBackdrop'),
    btnPdpClose: document.getElementById('btnPdpClose'),
    pdpContent: document.getElementById('pdpContent'),
    btnSearchTrigger: document.getElementById('btnSearchTrigger'),
    searchModalBackdrop: document.getElementById('searchModalBackdrop'),
    btnSearchClose: document.getElementById('btnSearchClose'),
    searchInput: document.getElementById('searchInput'),
    searchResultsContainer: document.getElementById('searchResultsContainer'),
    sizeGuideModalBackdrop: document.getElementById('sizeGuideModalBackdrop'),
    btnSizeGuideClose: document.getElementById('btnSizeGuideClose'),
    toastContainer: document.getElementById('toastContainer'),
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterInput: document.getElementById('newsletterInput')
  };

  // Initialize Application
  function init() {
    loadCartFromStorage();
    bindEvents();
    renderProducts();
    updateCartUI();
    handleScroll();
  }

  // Bind UI Events
  function bindEvents() {
    // 1. Landing Cover Transitions
    if (DOM.btnEnterWorld) {
      DOM.btnEnterWorld.addEventListener('click', enterStore);
    }
    if (DOM.btnSkipCover) {
      DOM.btnSkipCover.addEventListener('click', enterStore);
    }
    if (DOM.btnNavStory) {
      DOM.btnNavStory.addEventListener('click', function(e) {
        e.preventDefault();
        openBrandCover();
      });
    }

    // Audio Ambient Toggle
    if (DOM.btnAudioToggle) {
      DOM.btnAudioToggle.addEventListener('click', toggleLoomAudio);
    }

    // Scroll effect for header
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Currency Switcher
    if (DOM.currencySelect) {
      DOM.currencySelect.addEventListener('change', function (e) {
        state.currentCurrency = e.target.value;
        renderProducts();
        updateCartUI();
        if (state.selectedProduct) {
          renderPdpModal(state.selectedProduct);
        }
        showToast(`Currency changed to ${state.currentCurrency}`);
      });
    }

    // Collection Filter Tabs
    DOM.collectionTabs.forEach(btn => {
      btn.addEventListener('click', function () {
        DOM.collectionTabs.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.activeCollection = this.getAttribute('data-collection');
        renderProducts();
      });
    });

    // Sort Dropdown
    if (DOM.catalogueSortSelect) {
      DOM.catalogueSortSelect.addEventListener('change', function (e) {
        state.activeSort = e.target.value;
        renderProducts();
      });
    }

    // Cart Drawer Open/Close
    if (DOM.btnCartTrigger) {
      DOM.btnCartTrigger.addEventListener('click', openCart);
    }
    if (DOM.btnCartClose) {
      DOM.btnCartClose.addEventListener('click', closeCart);
    }
    if (DOM.cartDrawerBackdrop) {
      DOM.cartDrawerBackdrop.addEventListener('click', function (e) {
        if (e.target === DOM.cartDrawerBackdrop) {
          closeCart();
        }
      });
    }

    // Promo Code Apply
    if (DOM.btnApplyPromo) {
      DOM.btnApplyPromo.addEventListener('click', applyPromoCode);
    }
    if (DOM.promoInput) {
      DOM.promoInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyPromoCode();
        }
      });
    }

    // Checkout Flow
    if (DOM.btnProceedCheckout) {
      DOM.btnProceedCheckout.addEventListener('click', openCheckout);
    }
    if (DOM.btnCheckoutClose) {
      DOM.btnCheckoutClose.addEventListener('click', closeCheckout);
    }
    if (DOM.checkoutModalBackdrop) {
      DOM.checkoutModalBackdrop.addEventListener('click', function (e) {
        if (e.target === DOM.checkoutModalBackdrop) {
          closeCheckout();
        }
      });
    }
    if (DOM.checkoutForm) {
      DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    if (DOM.btnFinishOrder) {
      DOM.btnFinishOrder.addEventListener('click', function () {
        closeCheckout();
        clearCart();
        showToast("Thank you for choosing LIVY. Your heirloom bedsheet is being prepared.");
      });
    }

    // PDP Modal Close
    if (DOM.btnPdpClose) {
      DOM.btnPdpClose.addEventListener('click', closePdpModal);
    }
    if (DOM.pdpModalBackdrop) {
      DOM.pdpModalBackdrop.addEventListener('click', function (e) {
        if (e.target === DOM.pdpModalBackdrop) {
          closePdpModal();
        }
      });
    }

    // Search Drawer
    if (DOM.btnSearchTrigger) {
      DOM.btnSearchTrigger.addEventListener('click', openSearch);
    }
    if (DOM.btnSearchClose) {
      DOM.btnSearchClose.addEventListener('click', closeSearch);
    }
    if (DOM.searchModalBackdrop) {
      DOM.searchModalBackdrop.addEventListener('click', function (e) {
        if (e.target === DOM.searchModalBackdrop) {
          closeSearch();
        }
      });
    }
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', handleLiveSearch);
    }

    // Size Guide Modal
    if (DOM.btnSizeGuideClose) {
      DOM.btnSizeGuideClose.addEventListener('click', closeSizeGuide);
    }
    if (DOM.sizeGuideModalBackdrop) {
      DOM.sizeGuideModalBackdrop.addEventListener('click', function (e) {
        if (e.target === DOM.sizeGuideModalBackdrop) {
          closeSizeGuide();
        }
      });
    }

    // Lookbook Hotspots
    document.querySelectorAll('.hotspot-pin').forEach(pin => {
      pin.addEventListener('click', function () {
        const skuId = this.getAttribute('data-sku');
        const prod = LIVY_PRODUCTS.find(p => p.id === skuId);
        if (prod) {
          openPdpModal(prod);
        }
      });
    });

    // Newsletter Form
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = DOM.newsletterInput.value.trim();
        if (email) {
          showToast("Welcome to LIVY. Check your inbox for our artisan manifesto.");
          DOM.newsletterInput.value = '';
        }
      });
    }

    // Keyboard Shortcuts (Escape to close modals)
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePdpModal();
        closeCart();
        closeCheckout();
        closeSearch();
        closeSizeGuide();
      }
    });
  }

  // 1. Brand Journey: Transition into shopping homepage
  function enterStore() {
    if (DOM.brandCover) {
      DOM.brandCover.classList.add('entered');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openBrandCover() {
    if (DOM.brandCover) {
      DOM.brandCover.classList.remove('entered');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  // Audio Ambient Synthesizer: Meditative Loom Resonances via Web Audio API
  function toggleLoomAudio() {
    if (!state.audioContext) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        state.audioContext = new AudioCtx();
      } catch (err) {
        console.warn('Web Audio not supported');
        return;
      }
    }

    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }

    if (state.isAudioPlaying) {
      // Stop
      stopLoomAudio();
      state.isAudioPlaying = false;
      DOM.audioPulse.classList.remove('playing');
      DOM.audioText.textContent = 'Artisan Loom Sounds: Off';
    } else {
      // Start
      startLoomAudio();
      state.isAudioPlaying = true;
      DOM.audioPulse.classList.add('playing');
      DOM.audioText.textContent = 'Artisan Loom Sounds: Playing';
      showToast('Serene loom ambient audio activated');
    }
  }

  function startLoomAudio() {
    if (!state.audioContext) return;
    const ctx = state.audioContext;

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Warm deep drone (tanpura/wood resonance chord)
    const freqs = [108, 162, 216];
    state.ambientNodes = freqs.map(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return { osc, gain };
    });

    // Gentle rhythmic shuttle pulse
    const intervalId = setInterval(() => {
      if (!state.isAudioPlaying) {
        clearInterval(intervalId);
        return;
      }
      try {
        const now = ctx.currentTime;
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(320, now);
        clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

        clickGain.gain.setValueAtTime(0.06, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.08);
      } catch (e) {}
    }, 1800);

    state.ambientInterval = intervalId;
  }

  function stopLoomAudio() {
    if (state.ambientNodes) {
      state.ambientNodes.forEach(node => {
        try {
          node.osc.stop();
          node.osc.disconnect();
        } catch (e) {}
      });
      state.ambientNodes = [];
    }
    if (state.ambientInterval) {
      clearInterval(state.ambientInterval);
      state.ambientInterval = null;
    }
  }

  // Sticky header shadow
  function handleScroll() {
    if (window.scrollY > 40) {
      DOM.mainHeader.classList.add('scrolled');
    } else {
      DOM.mainHeader.classList.remove('scrolled');
    }
  }

  // Format Price according to selected currency
  function formatPrice(basePriceINR) {
    const cur = CURRENCIES[state.currentCurrency] || CURRENCIES.INR;
    if (state.currentCurrency === 'INR') {
      return `${cur.symbol}${basePriceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(basePriceINR * cur.rate);
    return `${cur.symbol}${converted.toLocaleString('en-US')}`;
  }

  // 2. Product Catalogue Rendering with Hover Cross-fade
  function renderProducts() {
    let products = [...LIVY_PRODUCTS];

    // Filter
    if (state.activeCollection !== 'all') {
      products = products.filter(p => p.category === state.activeCollection);
    }

    // Sort
    if (state.activeSort === 'price-asc') {
      products.sort((a, b) => a.priceINR - b.priceINR);
    } else if (state.activeSort === 'price-desc') {
      products.sort((a, b) => b.priceINR - a.priceINR);
    } else if (state.activeSort === 'bestseller') {
      products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    DOM.productsGrid.innerHTML = '';

    products.forEach((prod, idx) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-id', prod.id);

      const badgesHtml = `
        <div class="product-badges">
          <span class="badge-pill sku">${prod.skuCode}</span>
          ${prod.isBestseller ? '<span class="badge-pill bestseller">Artisan Bestseller</span>' : ''}
          ${prod.isNew ? '<span class="badge-pill new">New Weave</span>' : ''}
        </div>
      `;

      const swatchesHtml = prod.palette.map(color => `
        <span class="color-dot" style="background-color: ${color.hex};" title="${color.name}"></span>
      `).join('');

      card.innerHTML = `
        <div class="product-media" data-action="open-pdp" data-sku="${prod.id}">
          ${badgesHtml}
          <!-- Default Folded View -->
          <img 
            src="${prod.images.folded}" 
            alt="${prod.name} - Folded product view" 
            class="product-img-folded"
            loading="lazy"
          />
          <!-- Hover Lifestyle View Styled on Made Bed -->
          <img 
            src="${prod.images.lifestyle}" 
            alt="${prod.name} - Styled lifestyle on bed" 
            class="product-img-lifestyle"
            loading="lazy"
          />
          <div class="product-hover-indicator">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            1 Standalone • 2 Bed View
          </div>
          <button class="mobile-view-toggle" data-action="toggle-mobile-view" title="Toggle Lifestyle Bed View">
            2 Bed View
          </button>
          <div class="product-card-actions">
            <button class="btn-card-quickview" data-action="quickview" data-sku="${prod.id}">
              Product Details
            </button>
            <button class="btn-card-add" data-action="quickadd" data-sku="${prod.id}">
              + Add to Cart
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-meta-top">
            <span class="product-sku-tag">${prod.skuCode}</span>
            <span class="product-craft-tag">${prod.threadCount}</span>
          </div>
          <h3 class="product-title" data-action="open-pdp" data-sku="${prod.id}" style="cursor: pointer;">
            ${prod.name}
          </h3>
          <p class="product-subtitle">${prod.subtitle}</p>
          <div class="product-palette-swatches">
            ${swatchesHtml}
            <span class="swatch-label">Natural Pigments</span>
          </div>
          <div class="product-bottom-row">
            <div class="product-price-wrap">
              <span class="product-price">${formatPrice(prod.priceINR)}</span>
              <span class="product-sizes-hint">Single • Queen • King</span>
            </div>
            <button class="btn-link" data-action="open-pdp" data-sku="${prod.id}">
              Explore Craft →
            </button>
          </div>
        </div>
      `;

      DOM.productsGrid.appendChild(card);
    });

    // Attach card event listeners
    DOM.productsGrid.querySelectorAll('[data-action="open-pdp"], [data-action="quickview"]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        const skuId = this.getAttribute('data-sku') || this.closest('.product-card').getAttribute('data-id');
        const prod = LIVY_PRODUCTS.find(p => p.id === skuId);
        if (prod) openPdpModal(prod);
      });
    });

    DOM.productsGrid.querySelectorAll('[data-action="quickadd"]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        const skuId = this.getAttribute('data-sku');
        const prod = LIVY_PRODUCTS.find(p => p.id === skuId);
        if (prod) {
          addToCart(prod, 'queen', 1);
          showToast(`Added ${prod.name} (Queen) to cart`);
        }
      });
    });

    // Mobile view toggle (swaps folded and lifestyle on touch devices)
    DOM.productsGrid.querySelectorAll('[data-action="toggle-mobile-view"]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const media = this.closest('.product-media');
        const folded = media.querySelector('.product-img-folded');
        const lifestyle = media.querySelector('.product-img-lifestyle');
        if (lifestyle.style.opacity === '1') {
          lifestyle.style.opacity = '0';
          folded.style.opacity = '1';
          this.textContent = 'View on Bed';
        } else {
          lifestyle.style.opacity = '1';
          folded.style.opacity = '0';
          this.textContent = 'View Folded';
        }
      });
    });
  }

  // 3. Product Details Modal (PDP)
  function openPdpModal(product) {
    state.selectedProduct = product;
    state.selectedSizeId = 'queen';
    state.selectedQuantity = 1;
    state.activePdpImageIndex = 0;

    renderPdpModal(product);
    DOM.pdpModalBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closePdpModal() {
    DOM.pdpModalBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function renderPdpModal(product) {
    const selectedSize = product.sizes.find(s => s.id === state.selectedSizeId) || product.sizes[1];
    const computedPriceINR = Math.round(product.priceINR * selectedSize.priceMultiplier);

    const imagesList = [
      { url: product.images.folded, label: "Folded Linen", badge: "Folded on Neutral Background" },
      { url: product.images.lifestyle, label: "Styled on Bed", badge: "Styled Lifestyle on Bed" },
      { url: product.images.lifestyleHD || product.images.lifestyle, label: "Weave Detail", badge: "Handloom Percale Texture" }
    ];

    const currentImage = imagesList[state.activePdpImageIndex] || imagesList[0];

    const sizesHtml = product.sizes.map(size => {
      const isSelected = size.id === state.selectedSizeId ? 'selected' : '';
      return `
        <button class="btn-size-choice ${isSelected}" data-size-id="${size.id}">
          ${size.label}
        </button>
      `;
    }).join('');

    DOM.pdpContent.innerHTML = `
      <div class="pdp-grid">
        <!-- Image Gallery Side -->
        <div class="pdp-gallery">
          <div class="pdp-main-image-wrap">
            <img src="${currentImage.url}" alt="${product.name} ${currentImage.label}" class="pdp-main-image" id="pdpMainImg" />
            <div class="pdp-image-badge" id="pdpImgBadge">${currentImage.badge}</div>
          </div>
          <div class="pdp-thumbs-row">
            ${imagesList.map((img, i) => `
              <button class="pdp-thumb-btn ${i === state.activePdpImageIndex ? 'active' : ''}" data-img-index="${i}">
                <img src="${img.url}" alt="${img.label}" />
                <span class="thumb-label">${img.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Details Side -->
        <div class="pdp-details">
          <div class="pdp-breadcrumbs">
            <a href="#catalogue" onclick="document.getElementById('pdpModalBackdrop').classList.remove('open');">Catalogue</a>
            <span>/</span>
            <span>${product.collection}</span>
            <span>/</span>
            <span>${product.skuCode}</span>
          </div>

          <h2 class="pdp-title">${product.name}</h2>
          <p class="pdp-subtitle">${product.subtitle}</p>

          <div class="pdp-price-row">
            <span class="pdp-price" id="pdpPriceDisplay">${formatPrice(computedPriceINR)}</span>
            <span class="pdp-tax-note">Includes all duties & complimentary heritage packaging</span>
          </div>

          <!-- Size Selector -->
          <div class="pdp-size-section">
            <div class="pdp-size-header">
              <span class="pdp-size-label">Select Bed Size</span>
              <span class="btn-open-sizeguide" id="btnOpenSizeGuideFromPdp">Mattress Size Guide</span>
            </div>
            <div class="pdp-size-options" id="pdpSizeOptions">
              ${sizesHtml}
            </div>
            <div class="pdp-size-dimensions-hint" id="pdpSizeHint">
              <strong>${selectedSize.label}:</strong> ${selectedSize.sheetDimensions} • ${selectedSize.includes}
            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="pdp-actions-row">
            <div class="quantity-stepper">
              <button class="btn-qty" id="btnQtyMinus" aria-label="Decrease quantity">−</button>
              <span class="qty-display" id="pdpQtyVal">${state.selectedQuantity}</span>
              <button class="btn-qty" id="btnQtyPlus" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn-pdp-add" id="btnAddToCartPdp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Add to Cart • ${formatPrice(computedPriceINR * state.selectedQuantity)}</span>
            </button>
          </div>

          <!-- Product Details Accordions -->
          <div class="pdp-accordions">
            <!-- Accordion 1: Fabric & Craft Details -->
            <div class="accordion-item active">
              <button class="accordion-trigger" data-accordion="fabric">
                <span>Fabric Composition & Craftsmanship</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="accordion-body">
                <p><strong>Fabric:</strong> ${product.fabricComposition}</p>
                <p><strong>Thread Count & Weave:</strong> ${product.threadCount} (${product.weaveType})</p>
                <p><strong>Craft Technique:</strong> ${product.craftTechnique}</p>
                <p><strong>Artisan Cluster:</strong> ${product.artisanCluster}</p>
                <p style="margin-top:0.5rem;">${product.fullDescription}</p>
              </div>
            </div>

            <!-- Accordion 2: Dimensions & Fits -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-accordion="dimensions">
                <span>Product Dimensions & Set Inclusions</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="accordion-body">
                <p><strong>Flat Sheet:</strong> ${selectedSize.sheetDimensions}</p>
                <p><strong>Pillowcases:</strong> ${product.pillowDimensions}</p>
                <p><strong>Mattress Depth:</strong> Fits mattresses ${selectedSize.mattressFit}</p>
                <p><strong>Package Inclusions:</strong> ${selectedSize.includes}</p>
              </div>
            </div>

            <!-- Accordion 3: Care Instructions -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-accordion="care">
                <span>Care Instructions</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="accordion-body">
                <ul class="care-list">
                  ${product.careInstructions.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Accordion 4: Heritage & Sustainability -->
            <div class="accordion-item">
              <button class="accordion-trigger" data-accordion="sustainability">
                <span>Artisan Provenance & Sustainability</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="accordion-body">
                <p>${product.craftNotes}</p>
                <p style="margin-top:0.4rem; color:var(--color-terracotta);"><strong>Environmental Impact:</strong> ${product.sustainabilityImpact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind PDP internal events
    // Gallery Thumb clicks
    DOM.pdpContent.querySelectorAll('.pdp-thumb-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-img-index'), 10);
        state.activePdpImageIndex = index;
        const imgObj = imagesList[index];
        const mainImg = document.getElementById('pdpMainImg');
        const badge = document.getElementById('pdpImgBadge');
        if (mainImg) mainImg.src = imgObj.url;
        if (badge) badge.textContent = imgObj.badge;
        DOM.pdpContent.querySelectorAll('.pdp-thumb-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Size Selection
    DOM.pdpContent.querySelectorAll('.btn-size-choice').forEach(btn => {
      btn.addEventListener('click', function () {
        state.selectedSizeId = this.getAttribute('data-size-id');
        DOM.pdpContent.querySelectorAll('.btn-size-choice').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');

        const newSize = product.sizes.find(s => s.id === state.selectedSizeId);
        const newPrice = Math.round(product.priceINR * newSize.priceMultiplier);

        const priceElem = document.getElementById('pdpPriceDisplay');
        if (priceElem) priceElem.textContent = formatPrice(newPrice);

        const hintElem = document.getElementById('pdpSizeHint');
        if (hintElem) hintElem.innerHTML = `<strong>${newSize.label}:</strong> ${newSize.sheetDimensions} • ${newSize.includes}`;

        const addBtn = document.getElementById('btnAddToCartPdp');
        if (addBtn) {
          addBtn.querySelector('span').textContent = `Add to Cart • ${formatPrice(newPrice * state.selectedQuantity)}`;
        }
      });
    });

    // Quantity Stepper
    const btnMinus = document.getElementById('btnQtyMinus');
    const btnPlus = document.getElementById('btnQtyPlus');
    const qtyVal = document.getElementById('pdpQtyVal');
    const addBtn = document.getElementById('btnAddToCartPdp');

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        if (state.selectedQuantity > 1) {
          state.selectedQuantity--;
          qtyVal.textContent = state.selectedQuantity;
          updateAddBtnPrice();
        }
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        if (state.selectedQuantity < 10) {
          state.selectedQuantity++;
          qtyVal.textContent = state.selectedQuantity;
          updateAddBtnPrice();
        }
      });
    }

    function updateAddBtnPrice() {
      const curSize = product.sizes.find(s => s.id === state.selectedSizeId);
      const unit = Math.round(product.priceINR * curSize.priceMultiplier);
      if (addBtn) {
        addBtn.querySelector('span').textContent = `Add to Cart • ${formatPrice(unit * state.selectedQuantity)}`;
      }
    }

    // Add To Cart button
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        addToCart(product, state.selectedSizeId, state.selectedQuantity);
        closePdpModal();
        openCart();
        showToast(`Added ${state.selectedQuantity} × ${product.name} (${state.selectedSizeId}) to cart`);
      });
    }

    // Accordion Toggles
    DOM.pdpContent.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', function () {
        const item = this.closest('.accordion-item');
        item.classList.toggle('active');
      });
    });

    // Size Guide trigger in PDP
    const sizeGuideTrigger = document.getElementById('btnOpenSizeGuideFromPdp');
    if (sizeGuideTrigger) {
      sizeGuideTrigger.addEventListener('click', openSizeGuide);
    }
  }

  // 4. Cart Drawer Logic
  function addToCart(product, sizeId, quantity) {
    const sizeObj = product.sizes.find(s => s.id === sizeId) || product.sizes[1];
    const unitPriceINR = Math.round(product.priceINR * sizeObj.priceMultiplier);

    const existingIndex = state.cart.findIndex(item => item.productId === product.id && item.sizeId === sizeId);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        productId: product.id,
        name: product.name,
        skuCode: product.skuCode,
        subtitle: product.subtitle,
        sizeId: sizeId,
        sizeLabel: sizeObj.label,
        sizeDimensions: sizeObj.sheetDimensions,
        unitPriceINR: unitPriceINR,
        quantity: quantity,
        image: product.images.folded
      });
    }

    saveCartToStorage();
    updateCartUI();
  }

  function updateCartItemQty(productId, sizeId, delta) {
    const item = state.cart.find(i => i.productId === productId && i.sizeId === sizeId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeCartItem(productId, sizeId);
      return;
    }

    saveCartToStorage();
    updateCartUI();
  }

  function removeCartItem(productId, sizeId) {
    state.cart = state.cart.filter(i => !(i.productId === productId && i.sizeId === sizeId));
    saveCartToStorage();
    updateCartUI();
    showToast('Item removed from cart');
  }

  function clearCart() {
    state.cart = [];
    state.discountCode = null;
    state.discountAmount = 0;
    saveCartToStorage();
    updateCartUI();
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    DOM.cartBadgeCount.textContent = totalCount;
    DOM.cartBadgeCount.style.display = totalCount > 0 ? 'flex' : 'none';

    // Render items
    if (state.cart.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--color-terracotta);">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p>Your linen basket is currently empty.</p>
          <button class="btn btn-outline" onclick="document.getElementById('cartDrawerBackdrop').classList.remove('open');">
            Browse Catalogue
          </button>
        </div>
      `;
      DOM.shippingProgressFill.style.width = '0%';
      DOM.shippingHintText.innerHTML = `Add ₹4,000 more for <strong>Complimentary Heritage Gift Box</strong>`;
    } else {
      DOM.cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-size">${item.sizeLabel} • ${item.skuCode}</div>
            <div class="cart-item-stepper">
              <button class="cart-qty-btn" data-action="cart-minus" data-id="${item.productId}" data-size="${item.sizeId}">−</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" data-action="cart-plus" data-id="${item.productId}" data-size="${item.sizeId}">+</button>
            </div>
          </div>
          <div class="cart-item-price-side">
            <span class="cart-item-price">${formatPrice(item.unitPriceINR * item.quantity)}</span>
            <span class="cart-item-remove-btn" data-action="cart-remove" data-id="${item.productId}" data-size="${item.sizeId}">Remove</span>
          </div>
        </div>
      `).join('');

      // Bind cart buttons
      DOM.cartItemsContainer.querySelectorAll('[data-action="cart-minus"]').forEach(btn => {
        btn.addEventListener('click', () => {
          updateCartItemQty(btn.getAttribute('data-id'), btn.getAttribute('data-size'), -1);
        });
      });
      DOM.cartItemsContainer.querySelectorAll('[data-action="cart-plus"]').forEach(btn => {
        btn.addEventListener('click', () => {
          updateCartItemQty(btn.getAttribute('data-id'), btn.getAttribute('data-size'), 1);
        });
      });
      DOM.cartItemsContainer.querySelectorAll('[data-action="cart-remove"]').forEach(btn => {
        btn.addEventListener('click', () => {
          removeCartItem(btn.getAttribute('data-id'), btn.getAttribute('data-size'));
        });
      });
    }

    // Totals
    const subtotalINR = state.cart.reduce((sum, item) => sum + (item.unitPriceINR * item.quantity), 0);
    const freeShippingThreshold = 5000;
    const progressPercent = Math.min(100, Math.round((subtotalINR / freeShippingThreshold) * 100));

    DOM.shippingProgressFill.style.width = `${progressPercent}%`;
    if (subtotalINR >= freeShippingThreshold) {
      DOM.shippingHintText.innerHTML = `<strong>Unlocked:</strong> Complimentary Heritage Packaging & Shipping!`;
    } else {
      const remaining = freeShippingThreshold - subtotalINR;
      DOM.shippingHintText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more for <strong>Complimentary Heritage Gift Box</strong>`;
    }

    // Promo code discount calculation
    let discountINR = 0;
    if (state.discountCode === 'ARTISAN10') {
      discountINR = Math.round(subtotalINR * 0.10);
    } else if (state.discountCode === 'LIVYFIRST') {
      discountINR = Math.min(500, subtotalINR);
    }

    const shippingINR = (subtotalINR >= freeShippingThreshold || subtotalINR === 0) ? 0 : 350;
    const finalTotalINR = Math.max(0, subtotalINR - discountINR + shippingINR);

    DOM.cartSubtotalElem.textContent = formatPrice(subtotalINR);
    DOM.cartDiscountElem.textContent = discountINR > 0 ? `-${formatPrice(discountINR)}` : `${formatPrice(0)}`;
    DOM.cartShippingElem.textContent = shippingINR === 0 ? "Free" : formatPrice(shippingINR);
    DOM.cartTotalElem.textContent = formatPrice(finalTotalINR);

    if (DOM.btnProceedCheckout) {
      DOM.btnProceedCheckout.disabled = state.cart.length === 0;
      DOM.btnProceedCheckout.style.opacity = state.cart.length === 0 ? '0.5' : '1';
    }
  }

  function applyPromoCode() {
    const code = DOM.promoInput.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'ARTISAN10') {
      state.discountCode = 'ARTISAN10';
      showToast('10% Artisan discount applied!');
      updateCartUI();
    } else if (code === 'LIVYFIRST') {
      state.discountCode = 'LIVYFIRST';
      showToast('₹500 Welcome discount applied!');
      updateCartUI();
    } else {
      showToast('Invalid promo code. Try ARTISAN10');
    }
  }

  function openCart() {
    DOM.cartDrawerBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeCart() {
    DOM.cartDrawerBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('livy_cart', JSON.stringify(state.cart));
    } catch (e) {}
  }

  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('livy_cart');
      if (saved) {
        state.cart = JSON.parse(saved);
      }
    } catch (e) {}
  }

  // 5. Checkout Simulation Modal
  function openCheckout() {
    if (state.cart.length === 0) return;
    closeCart();
    DOM.checkoutFormView.style.display = 'block';
    DOM.checkoutSuccessView.style.display = 'none';
    DOM.checkoutModalBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeCheckout() {
    DOM.checkoutModalBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const btn = DOM.checkoutForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>Processing Order...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      const randomRef = 'LIVY-' + Math.floor(100000 + Math.random() * 900000);
      DOM.checkoutOrderRef.textContent = randomRef;
      DOM.checkoutFormView.style.display = 'none';
      DOM.checkoutSuccessView.style.display = 'block';
    }, 1200);
  }

  // 6. Live Search Drawer
  function openSearch() {
    DOM.searchModalBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
    setTimeout(() => {
      DOM.searchInput.focus();
    }, 100);
    handleLiveSearch();
  }

  function closeSearch() {
    DOM.searchModalBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
    DOM.searchInput.value = '';
  }

  function handleLiveSearch() {
    const q = DOM.searchInput.value.trim().toLowerCase();
    const results = LIVY_PRODUCTS.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.skuCode.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fullDescription.toLowerCase().includes(q)
      );
    });

    if (results.length === 0) {
      DOM.searchResultsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--color-ink-muted);">
          No crafted pieces found matching "${q}".
        </div>
      `;
    } else {
      DOM.searchResultsContainer.innerHTML = results.map(prod => `
        <div class="search-result-row" data-sku="${prod.id}">
          <img src="${prod.images.folded}" alt="${prod.name}" class="search-result-thumb" />
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 0.95rem;">${prod.name}</div>
            <div style="font-size: 0.78rem; color: var(--color-ink-muted);">${prod.skuCode} • ${prod.subtitle}</div>
          </div>
          <div style="font-family: var(--font-heading); font-weight: 600;">
            ${formatPrice(prod.priceINR)}
          </div>
        </div>
      `).join('');

      DOM.searchResultsContainer.querySelectorAll('.search-result-row').forEach(row => {
        row.addEventListener('click', function () {
          const skuId = this.getAttribute('data-sku');
          const prod = LIVY_PRODUCTS.find(p => p.id === skuId);
          if (prod) {
            closeSearch();
            openPdpModal(prod);
          }
        });
      });
    }
  }

  // 7. Size Guide Modal
  function openSizeGuide() {
    DOM.sizeGuideModalBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeSizeGuide() {
    DOM.sizeGuideModalBackdrop.classList.remove('open');
    if (!DOM.pdpModalBackdrop.classList.contains('open')) {
      document.body.classList.remove('modal-open');
    }
  }

  // Toast Notification System
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-terracotta); flex-shrink: 0;"><path d="M20 6 9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // Export for testing
  window.LivyApp = {
    state,
    enterStore,
    openBrandCover,
    openPdpModal,
    addToCart,
    openCart
  };

  // Run on DOM load
  document.addEventListener('DOMContentLoaded', init);
})();
