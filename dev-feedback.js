/**
 * VitePress Dev Feedback Tool
 * Inspired by github.com/ukogan/ui-annotator
 *
 * Toggle: Ctrl+Shift+A or click the floating ✏️ button (bottom-left).
 * Usage:
 *   1. Activate → hover to highlight → click element → type comment → Save
 *   2. Repeat for all issues
 *   3. Click "Copy MD" → paste into LLM chat
 *
 * Features:
 *   - Numbered badges pinned to annotated elements
 *   - Annotations persist in sessionStorage (across SPA navigation)
 *   - VitePress SPA-aware: badges restored after client-side navigation
 *   - Markdown output optimized for AI coding agents
 *   - Dev mode only (not included in production build)
 */
(function () {
  'use strict';
  if (window.__devFeedback) return;

  var P = '__fb-';
  var Z = 2147483647;
  var SK = '__fb_data';

  // ── State ──────────────────────────────────────────────────────────────────
  var active = false;
  var annotations = [];
  var counter = 0;
  var badges = [];
  var hovered = null;
  var cbox = null;
  var styleEl = null;
  var panel = null;
  var toast = null;
  var trigger = null;

  function curPath() { return location.pathname + location.search; }

  // ── Persistence ────────────────────────────────────────────────────────────
  function persist() {
    try {
      sessionStorage.setItem(SK, JSON.stringify({
        counter: counter,
        items: annotations.map(function (a) {
          return {
            index: a.index, url: a.url, selector: a.selector,
            tag: a.tag, classes: a.classes, id: a.id,
            text: a.text, comment: a.comment,
            rect: a.rect, styles: a.styles
          };
        })
      }));
    } catch (e) { /* private mode, quota */ }
  }

  function restore() {
    try {
      var raw = sessionStorage.getItem(SK);
      if (!raw) return;
      var d = JSON.parse(raw);
      counter = d.counter || 0;
      annotations = d.items || [];
    } catch (e) { /* ignore */ }
  }

  function clearStore() {
    try { sessionStorage.removeItem(SK); } catch (e) { /* */ }
  }

  // ── Styles ─────────────────────────────────────────────────────────────────
  function injectCSS() {
    if (styleEl) return;
    styleEl = document.createElement('style');
    styleEl.textContent = [
      '.' + P + 'hl{outline:2px solid #3b82f6!important;outline-offset:1px!important;background:rgba(59,130,246,.08)!important;cursor:crosshair!important}',
      '.' + P + 'badge{position:absolute;z-index:' + Z + ';width:22px;height:22px;border-radius:50%;background:#ef4444;color:#fff;font:bold 12px/22px system-ui,sans-serif;text-align:center;pointer-events:none;box-shadow:0 1px 4px rgba(0,0,0,.3)}',
      '.' + P + 'cb{position:absolute;z-index:' + Z + ';background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px;box-shadow:0 4px 16px rgba(0,0,0,.3);display:flex;gap:6px;align-items:flex-start;font-family:system-ui,sans-serif}',
      '.' + P + 'cb textarea{width:260px;height:56px;resize:vertical;background:#0f172a;color:#e2e8f0;border:1px solid #475569;border-radius:4px;padding:6px 8px;font:13px/1.4 system-ui,sans-serif;outline:none}',
      '.' + P + 'cb textarea:focus{border-color:#3b82f6}',
      '.' + P + 'cb button{background:#3b82f6;color:#fff;border:none;border-radius:4px;padding:6px 12px;font:600 12px system-ui,sans-serif;cursor:pointer;white-space:nowrap}',
      '.' + P + 'cb button:hover{background:#2563eb}',
      '.' + P + 'cb button.x{background:#475569}',
      '.' + P + 'cb button.x:hover{background:#64748b}',
      '.' + P + 'pnl{position:fixed;bottom:16px;right:16px;z-index:' + Z + ';background:#1e293b;border:1px solid #334155;border-radius:10px;padding:12px 14px;font:13px system-ui,sans-serif;color:#e2e8f0;box-shadow:0 4px 20px rgba(0,0,0,.4);display:flex;flex-direction:column;gap:8px;min-width:180px}',
      '.' + P + 'pnl-t{font-weight:700;font-size:14px;display:flex;align-items:center;gap:6px}',
      '.' + P + 'pnl-c{background:#3b82f6;color:#fff;border-radius:10px;padding:0 7px;font-size:11px;line-height:20px}',
      '.' + P + 'pnl-s{font-size:11px;color:#94a3b8;margin-top:-4px}',
      '.' + P + 'pnl-b{display:flex;flex-wrap:wrap;gap:4px}',
      '.' + P + 'pnl button{background:#334155;color:#e2e8f0;border:none;border-radius:4px;padding:5px 10px;font:600 11px system-ui,sans-serif;cursor:pointer}',
      '.' + P + 'pnl button:hover{background:#475569}',
      '.' + P + 'pnl button.pr{background:#3b82f6}',
      '.' + P + 'pnl button.pr:hover{background:#2563eb}',
      '.' + P + 'pnl button.dn{background:#dc2626}',
      '.' + P + 'pnl button.dn:hover{background:#b91c1c}',
      '.' + P + 'toast{position:fixed;bottom:80px;right:16px;z-index:' + Z + ';background:#065f46;color:#d1fae5;border-radius:6px;padding:8px 14px;font:600 12px system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.3);opacity:0;transition:opacity .2s;pointer-events:none}',
      'body.' + P + 'on,body.' + P + 'on *{cursor:crosshair!important}',
      '.' + P + 'btn{position:fixed;bottom:16px;left:16px;z-index:' + Z + ';width:40px;height:40px;border-radius:50%;background:#1e293b;border:1px solid #334155;color:#e2e8f0;font-size:18px;line-height:40px;text-align:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:background .2s,transform .1s;user-select:none}',
      '.' + P + 'btn:hover{background:#334155;transform:scale(1.1)}',
      '.' + P + 'btn.on{background:#3b82f6;border-color:#60a5fa}',
    ].join('\n');
    document.head.appendChild(styleEl);
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = P + 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.style.opacity = '0'; }, 1800);
  }

  // ── Selector Generator ─────────────────────────────────────────────────────
  function getSelector(el) {
    if (el.id) {
      var s = '#' + CSS.escape(el.id);
      if (document.querySelectorAll(s).length === 1) return s;
    }
    var tid = el.getAttribute('data-testid');
    if (tid) {
      var ts = '[data-testid="' + tid + '"]';
      if (document.querySelectorAll(ts).length === 1) return ts;
    }
    var parts = [];
    var cur = el;
    while (cur && cur !== document.body && cur !== document.documentElement) {
      parts.unshift(segment(cur));
      var cand = parts.join(' > ');
      if (document.querySelectorAll(cand).length === 1) return cand;
      cur = cur.parentElement;
    }
    return parts.join(' > ');
  }

  function segment(el) {
    var tag = el.tagName.toLowerCase();
    if (el.id) return '#' + CSS.escape(el.id);
    var cls = Array.from(el.classList).filter(function (c) {
      return c.indexOf(P) !== 0 && c.length < 40;
    });
    if (cls.length > 0) {
      for (var i = 0; i < cls.length; i++) {
        var sel = tag + '.' + CSS.escape(cls[i]);
        var par = el.parentElement;
        if (par && par.querySelectorAll(':scope > ' + sel).length === 1) return sel;
      }
      return tag + '.' + CSS.escape(cls[0]);
    }
    var parent = el.parentElement;
    if (parent) {
      var idx = Array.from(parent.children).indexOf(el) + 1;
      return tag + ':nth-child(' + idx + ')';
    }
    return tag;
  }

  // ── Computed Styles ────────────────────────────────────────────────────────
  function getStyles(el) {
    var cs = getComputedStyle(el);
    return {
      fontSize: cs.fontSize, color: cs.color,
      backgroundColor: cs.backgroundColor,
      padding: cs.padding, margin: cs.margin
    };
  }

  // ── Badges ─────────────────────────────────────────────────────────────────
  function placeBadge(el, idx) {
    var b = document.createElement('div');
    b.className = P + 'badge';
    b.textContent = idx;
    posBadge(b, el);
    document.body.appendChild(b);
    var repos = function () { posBadge(b, el); };
    window.addEventListener('scroll', repos, true);
    window.addEventListener('resize', repos);
    b._cleanup = function () {
      window.removeEventListener('scroll', repos, true);
      window.removeEventListener('resize', repos);
      b.remove();
    };
    return b;
  }

  function posBadge(b, el) {
    var r = el.getBoundingClientRect();
    b.style.left = (r.left + window.scrollX - 8) + 'px';
    b.style.top = (r.top + window.scrollY - 8) + 'px';
  }

  function restoreBadges() {
    removeBadges();
    var url = curPath();
    annotations.forEach(function (a) {
      if (a.url !== url) return;
      try {
        var el = document.querySelector(a.selector);
        if (el) badges.push(placeBadge(el, a.index));
      } catch (e) { /* invalid selector */ }
    });
  }

  function removeBadges() {
    badges.forEach(function (b) { if (b._cleanup) b._cleanup(); });
    badges = [];
  }

  // ── Comment Box ────────────────────────────────────────────────────────────
  function openCB(el, rect) {
    closeCB();
    var box = document.createElement('div');
    box.className = P + 'cb';

    var ta = document.createElement('textarea');
    ta.placeholder = 'Describe the issue...';
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSave(); }
      if (e.key === 'Escape') closeCB();
    }, true);

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;flex-direction:column;gap:4px';

    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', doSave, true);

    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = '\u2715';
    cancelBtn.className = 'x';
    cancelBtn.addEventListener('click', function () { closeCB(); }, true);

    btns.appendChild(saveBtn);
    btns.appendChild(cancelBtn);
    box.appendChild(ta);
    box.appendChild(btns);

    var top = rect.bottom + window.scrollY + 6;
    var left = rect.left + window.scrollX;
    if (left + 300 > window.innerWidth + window.scrollX) {
      left = window.innerWidth + window.scrollX - 310;
    }
    box.style.left = left + 'px';
    box.style.top = top + 'px';
    document.body.appendChild(box);
    ta.focus();
    cbox = box;

    function doSave() {
      var comment = ta.value.trim();
      if (!comment) return;
      addAnnotation(el, comment);
      closeCB();
    }
  }

  function closeCB() {
    if (cbox) { cbox.remove(); cbox = null; }
  }

  // ── Add Annotation ─────────────────────────────────────────────────────────
  function addAnnotation(el, comment) {
    counter++;
    var rect = el.getBoundingClientRect();
    annotations.push({
      index: counter, url: curPath(),
      selector: getSelector(el),
      tag: el.tagName.toLowerCase(),
      classes: Array.from(el.classList).filter(function (c) { return c.indexOf(P) !== 0; }),
      id: el.id || null,
      text: (el.textContent || '').trim().substring(0, 80),
      comment: comment,
      rect: {
        x: Math.round(rect.x), y: Math.round(rect.y),
        width: Math.round(rect.width), height: Math.round(rect.height)
      },
      styles: getStyles(el)
    });
    persist();
    badges.push(placeBadge(el, counter));
    updatePanel();
    showToast('Annotation #' + counter + ' saved');
  }

  // ── Event Handlers ─────────────────────────────────────────────────────────
  function onMove(e) {
    if (isUI(e.target)) return;
    if (hovered && hovered !== e.target) hovered.classList.remove(P + 'hl');
    hovered = e.target;
    hovered.classList.add(P + 'hl');
  }

  function onOut() {
    if (hovered) { hovered.classList.remove(P + 'hl'); hovered = null; }
  }

  function onClk(e) {
    if (isUI(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (hovered) hovered.classList.remove(P + 'hl');
    openCB(e.target, e.target.getBoundingClientRect());
  }

  function isUI(el) {
    var uic = [P + 'badge', P + 'cb', P + 'pnl', P + 'toast', P + 'btn'];
    while (el) {
      if (el.className && typeof el.className === 'string') {
        for (var i = 0; i < uic.length; i++) {
          if (el.className.indexOf(uic[i]) !== -1) return true;
        }
      }
      el = el.parentElement;
    }
    return false;
  }

  // ── Markdown / JSON Export ─────────────────────────────────────────────────
  function toMD() {
    var groups = {};
    var order = [];
    annotations.forEach(function (a) {
      if (!groups[a.url]) { groups[a.url] = []; order.push(a.url); }
      groups[a.url].push(a);
    });
    var lines = ['## UI Annotations', ''];
    var multi = order.length > 1;
    order.forEach(function (url) {
      if (multi) { lines.push('### Page: `' + url + '`'); lines.push(''); }
      groups[url].forEach(function (a) {
        var h = multi ? '####' : '###';
        lines.push(h + ' ' + a.index + '. `' + a.selector + '` (' + a.tag + ')');
        lines.push('- **Comment:** ' + a.comment);
        if (a.text) lines.push('- **Text:** "' + a.text + '"');
        var s = a.styles;
        lines.push('- **Styles:** font-size: ' + s.fontSize + ', color: ' + s.color + ', bg: ' + s.backgroundColor + ', padding: ' + s.padding);
        lines.push('- **Box:** ' + a.rect.width + '\u00d7' + a.rect.height + ' at (' + a.rect.x + ', ' + a.rect.y + ')');
        lines.push('');
      });
    });
    return lines.join('\n');
  }

  function toJSON() {
    return JSON.stringify(annotations.map(function (a) {
      return {
        index: a.index, url: a.url, selector: a.selector,
        tag: a.tag, classes: a.classes, id: a.id,
        text: a.text, comment: a.comment,
        rect: a.rect, styles: a.styles
      };
    }), null, 2);
  }

  function copyText(text, msg) {
    navigator.clipboard.writeText(text).then(
      function () { showToast(msg); },
      function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast(msg);
      }
    );
  }

  // ── Control Panel ──────────────────────────────────────────────────────────
  function createPanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.className = P + 'pnl';
    document.body.appendChild(panel);
  }

  function removePanel() {
    if (panel) { panel.remove(); panel = null; }
  }

  function updatePanel() {
    if (!panel) return;
    panel.innerHTML = '';

    var title = document.createElement('div');
    title.className = P + 'pnl-t';
    title.textContent = '\ud83d\udcdd Feedback ';
    var cnt = document.createElement('span');
    cnt.className = P + 'pnl-c';
    cnt.textContent = annotations.length;
    title.appendChild(cnt);
    panel.appendChild(title);

    var thisPage = annotations.filter(function (a) { return a.url === curPath(); }).length;
    var other = annotations.length - thisPage;
    if (other > 0) {
      var sub = document.createElement('div');
      sub.className = P + 'pnl-s';
      sub.textContent = thisPage + ' this page, ' + other + ' other pages';
      panel.appendChild(sub);
    }

    var btns = document.createElement('div');
    btns.className = P + 'pnl-b';
    btns.appendChild(mkBtn('Copy MD', 'pr', function () { copyText(toMD(), 'Markdown copied'); }));
    btns.appendChild(mkBtn('Copy JSON', 'pr', function () { copyText(toJSON(), 'JSON copied'); }));
    btns.appendChild(mkBtn('Clear', 'dn', function () {
      removeBadges(); annotations = []; counter = 0;
      clearStore(); updatePanel(); showToast('Cleared');
    }));
    btns.appendChild(mkBtn('Exit', '', function () { deactivate(); }));
    panel.appendChild(btns);
  }

  function mkBtn(text, cls, handler) {
    var b = document.createElement('button');
    b.textContent = text;
    if (cls) b.className = cls;
    b.addEventListener('click', handler, true);
    return b;
  }

  // ── Activate / Deactivate ──────────────────────────────────────────────────
  function activate() {
    if (active) return;
    active = true;
    injectCSS();
    restore();
    document.body.classList.add(P + 'on');
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseout', onOut, true);
    document.addEventListener('click', onClk, true);
    createPanel();
    restoreBadges();
    updatePanel();
    trigger.classList.add('on');
    trigger.title = 'Feedback ON (Ctrl+Shift+A to toggle)';

    if (annotations.length > 0) {
      var n = annotations.length;
      var tp = annotations.filter(function (a) { return a.url === curPath(); }).length;
      showToast('Loaded ' + n + ' annotation' + (n !== 1 ? 's' : '') + ' (' + tp + ' on this page)');
    } else {
      showToast('Feedback ON \u2014 click any element to annotate');
    }
  }

  function deactivate() {
    if (!active) return;
    active = false;
    document.body.classList.remove(P + 'on');
    document.removeEventListener('mousemove', onMove, true);
    document.removeEventListener('mouseout', onOut, true);
    document.removeEventListener('click', onClk, true);
    if (hovered) { hovered.classList.remove(P + 'hl'); hovered = null; }
    closeCB();
    removeBadges();
    removePanel();
    if (toast) { toast.remove(); toast = null; }
    trigger.classList.remove('on');
    trigger.title = 'Feedback OFF (Ctrl+Shift+A to toggle)';
  }

  function toggle() { active ? deactivate() : activate(); }

  // ── Floating Trigger Button ────────────────────────────────────────────────
  trigger = document.createElement('div');
  trigger.className = P + 'btn';
  trigger.textContent = '\u270f\ufe0f';
  trigger.title = 'Feedback OFF (Ctrl+Shift+A to toggle)';
  trigger.addEventListener('click', toggle);
  document.body.appendChild(trigger);

  // ── Keyboard Shortcuts ─────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    // Ctrl+Shift+A — toggle
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      toggle();
      return;
    }
    // Escape — exit (when active, no comment box open)
    if (e.key === 'Escape' && active && !cbox) {
      deactivate();
    }
  }, true);

  // ── VitePress SPA Navigation Hook ──────────────────────────────────────────
  // VitePress uses history.pushState for client-side navigation.
  // We hook into it to restore badges on the new page.
  function onRouteChange() {
    if (!active) return;
    // Wait for Vue to render new page content
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        restoreBadges();
        updatePanel();
      });
    });
  }

  var _push = history.pushState;
  var _replace = history.replaceState;
  history.pushState = function () {
    _push.apply(this, arguments);
    onRouteChange();
  };
  history.replaceState = function () {
    _replace.apply(this, arguments);
    onRouteChange();
  };
  window.addEventListener('popstate', onRouteChange);

  // ── Expose API ─────────────────────────────────────────────────────────────
  window.__devFeedback = { activate: activate, deactivate: deactivate, toggle: toggle };
})();
