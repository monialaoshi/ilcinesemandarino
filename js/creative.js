(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 48
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  // Load more reviews functionality
  let currentIndex = 3;
  const reviews = $('.review-box');
  const loadMoreButton = $('#load-more');

  loadMoreButton.click(function () {
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      if (i < reviews.length) {
        $(reviews[i]).fadeIn();
      }
    }
    currentIndex += 3;

    // Hide the button if all reviews are shown
    if (currentIndex >= reviews.length) {
      loadMoreButton.hide();
    }
  });

  /**
   * cookie consent
   */

  window.cookieconsent.initialise({
    container: document.getElementById("content"),
    position: "bottom",
    palette: {
      popup: { background: "#fff" },
      button: { background: "green" }
    },
    revokable: false,
    revokeBtn: '<span></span>', // fix to hide revoke button
    type: 'opt-in',  // Permette di mostrare entrambi i pulsanti "Accetta" e "Rifiuta"
    content: {
      message: 'Questo sito utilizza cookie per migliorare l\'esperienza utente ed ottenere statistiche sull\'utilizzo.',
      dismiss: 'Rifiuta',
      allow: 'Acconsenti e chiudi',
      link: 'Leggi di più',
      href: 'privacy-policy.html'
    },
    onInitialise: function (status) {
      var type = this.options.type;
      var didConsent = this.hasConsented();
      if (type == 'opt-in' && didConsent) {
        enableTracking(); // L'utente ha acconsentito ai cookie
      }
    },
    onStatusChange: function (status) {
      if (this.hasConsented()) {
        enableTracking(); // L'utente ha acconsentito ai cookie
      } else {
        disableTracking(); // L'utente ha rifiutato i cookie
      }
    },
    law: {
      regionalLaw: false,
    },
    location: true,
  });

  // Funzione per attivare GA4 e Meta Pixel
  function enableTracking() {
    // GA4 Tracking
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=G-XHWSVXWXG5', 'ga');

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XHWSVXWXG5');

    // Facebook Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1356508055158067');
    fbq('track', 'PageView');
  }

  // Funzione per disattivare GA4 e Facebook Pixel
  function disableTracking() {
    // Disabilita GA4
    window['ga-disable-G-XHWSVXWXG5'] = true;

    // Disattiva Facebook Pixel
    window.fbq = null;
  }

})(jQuery); // End of use strict