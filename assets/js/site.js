(function () {
  var html = document.documentElement;

  /* 언어: 저장된 선택 → 없으면 브라우저 언어 */
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || (navigator.language && navigator.language.indexOf('ko') === 0 ? 'ko' : 'ko');
  setLang(lang);

  function setLang(v) {
    html.setAttribute('lang', v);
    try { localStorage.setItem('lang', v); } catch (e) {}
    mark('[data-set-lang]', 'data-set-lang', v);
  }

  function setTheme(v) {
    html.setAttribute('data-theme', v);
    var sheet = document.querySelector('[data-theme-sheet]');
    if (sheet) sheet.setAttribute('href', 'assets/css/theme-' + v + '.css');
    mark('[data-set-theme]', 'data-set-theme', v);
  }

  function setLayout(v) {
    html.setAttribute('data-layout', v);
    mark('[data-set-layout]', 'data-set-layout', v);
  }

  function mark(sel, attr, v) {
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.toggle('is-on', nodes[i].getAttribute(attr) === v);
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-set-theme],[data-set-lang],[data-set-layout]') : null;
    if (!t) return;
    if (t.hasAttribute('data-set-theme')) setTheme(t.getAttribute('data-set-theme'));
    else if (t.hasAttribute('data-set-layout')) setLayout(t.getAttribute('data-set-layout'));
    else setLang(t.getAttribute('data-set-lang'));
  });
})();
