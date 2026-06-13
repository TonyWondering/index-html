/**
 * 学成在线 - 交互脚本
 */
document.addEventListener('DOMContentLoaded', function () {

  var HEADER_OFFSET = 60;

  // ========== 搜索功能 ==========
  var searchInput = document.querySelector('.search input');
  var searchBtn = document.querySelector('.search button');

  function doSearch() {
    var keyword = searchInput.value.trim();
    if (keyword) {
      alert('搜索功能开发中，您搜索的关键词：' + keyword);
    }
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { doSearch(); }
  });

  // ========== 锚点平滑滚动（精品推荐 + 侧边栏） ==========
  var anchorLinks = document.querySelectorAll('.goods ul li a, .sidebar-nav li a, .nav .dropdown a');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // 课程卡片 hover 提示
  var courseCardLinks = document.querySelectorAll('.box .content ul:not(.tool-list) li a');
  courseCardLinks.forEach(function (link) {
    link.setAttribute('title', '点击跳转播放');
  });

  // ========== 滚动时高亮侧边栏当前项 ==========
  var sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
  var sectionIds = [];
  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionIds.push(href.substring(1));
    }
  });

  function updateActiveLink() {
    var scrollY = window.pageYOffset + HEADER_OFFSET + 40;
    var current = sectionIds[0];

    for (var i = sectionIds.length - 1; i >= 0; i--) {
      var el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollY) {
        current = sectionIds[i];
        break;
      }
    }

    sidebarLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ========== Header 滚动收缩 ==========
  var header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('compact');
    } else {
      header.classList.remove('compact');
    }
  }, { passive: true });

  // ========== 课程链接：新窗口打开 + B站静音 ==========
  var courseLinks = document.querySelectorAll('.box .content ul li a');
  courseLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    // 跳过工具卡片的 javascript:void(0) 和锚点占位
    if (!href || href.startsWith('javascript:') || href === '#') return;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    if (href.indexOf('bilibili.com') !== -1) {
      link.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + 'muted=1');
    }
  });

  // ========== 软件工具卡片：点击弹出居中弹框 ==========
  var toolItems = document.querySelectorAll('.tool-item');
  var overlay = document.getElementById('toolModalOverlay');
  var modalName = document.getElementById('toolModalName');
  var modalIntro = document.getElementById('toolModalIntro');
  var modalReq = document.getElementById('toolModalReq');
  var modalVer = document.getElementById('toolModalVer');
  var modalSite = document.getElementById('toolModalSite');
  var modalDl = document.getElementById('toolModalDl');
  var modalClose = document.getElementById('toolModalClose');

  function openToolModal(item) {
    var name = item.getAttribute('data-name');
    var intro = item.getAttribute('data-intro');
    var req = item.getAttribute('data-req');
    var ver = item.getAttribute('data-ver');
    var site = item.getAttribute('data-site');
    var dl = item.getAttribute('data-dl');

    modalName.textContent = name;
    modalIntro.textContent = intro;
    modalReq.textContent = req;
    modalVer.textContent = ver;
    modalSite.textContent = site;
    modalSite.setAttribute('href', site);
    modalDl.setAttribute('href', dl);
    modalDl.setAttribute('download', '');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeToolModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toolItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openToolModal(item);
    });
  });

  modalClose.addEventListener('click', closeToolModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeToolModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeToolModal();
    }
  });

  // ========== 返回顶部按钮 ==========
  var backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.innerHTML = '&#8593;';
  backBtn.setAttribute('aria-label', '返回顶部');
  document.body.appendChild(backBtn);

  function toggleBackBtn() {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackBtn, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
