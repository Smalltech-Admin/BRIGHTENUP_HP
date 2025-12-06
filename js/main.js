/**
 * 彩り（いろどり）訪問介護 - メインJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニュー
  initHamburgerMenu();

  // FAQアコーディオン
  initFaqAccordion();

  // スクロールアニメーション
  initScrollAnimation();

  // スムーススクロール
  initSmoothScroll();

  // ヒーロースライドショー
  initHeroSlideshow();
});

/**
 * ハンバーガーメニューの初期化
 */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function() {
    this.classList.toggle('is-active');
    nav.classList.toggle('is-open');

    // アクセシビリティ対応
    const isOpen = nav.classList.contains('is-open');
    this.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
  });

  // ナビゲーションリンクをクリックしたらメニューを閉じる
  const navLinks = nav.querySelectorAll('.nav__link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    });
  });

  // メニュー外をクリックしたら閉じる
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
    }
  });
}

/**
 * FAQアコーディオンの初期化
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');

    if (!question || !answer) return;

    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('is-open');

      // 他の項目を閉じる（オプション：アコーディオン動作）
      // faqItems.forEach(function(otherItem) {
      //   otherItem.classList.remove('is-open');
      // });

      // クリックした項目を開閉
      item.classList.toggle('is-open');

      // アクセシビリティ対応
      question.setAttribute('aria-expanded', !isOpen);
      answer.setAttribute('aria-hidden', isOpen);
    });

    // 初期状態のアクセシビリティ属性を設定
    question.setAttribute('aria-expanded', 'false');
    answer.setAttribute('aria-hidden', 'true');
  });
}

/**
 * スクロールアニメーションの初期化
 */
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  // Intersection Observer が使用可能かチェック
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Intersection Observer 非対応ブラウザ用のフォールバック
    fadeElements.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 電話番号リンクの動作（PC時は発信しない）
 */
function initPhoneLink() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  phoneLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // 画面幅が768px以上（PCサイズ）の場合は発信を防止
      if (window.innerWidth >= 768) {
        e.preventDefault();
        // オプション：電話番号をコピーする機能など
      }
    });
  });
}

/**
 * ヒーロースライドショーの初期化
 */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero__bg');

  if (slides.length <= 1) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5秒ごとに切り替え

  setInterval(function() {
    slides[currentSlide].classList.remove('is-active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('is-active');
  }, slideInterval);
}
