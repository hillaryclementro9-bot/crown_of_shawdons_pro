/* ============================================
   CROWN OF SHADOWS — login.js
   MFA (TOTP), Google OAuth, Admin
   ============================================ */

/* ── TOTP (RFC 6238) ── */
const LoginTOTP = {
  _b32decode(s) {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    s = s.toUpperCase().replace(/=+$/, '');
    let bits = 0, val = 0;
    const out = [];
    for (const c of s) {
      val = (val << 5) | alpha.indexOf(c);
      bits += 5;
      if (bits >= 8) { bits -= 8; out.push((val >> bits) & 0xff); }
    }
    return new Uint8Array(out);
  },

  async _hmac(keyBytes, msgBytes) {
    const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', key, msgBytes));
  },

  async verify(secret, token) {
    const counter = Math.floor(Date.now() / 1000 / 30);
    for (const delta of [-1, 0, 1]) {
      const msg = new Uint8Array(8);
      let c = counter + delta;
      for (let i = 7; i >= 0; i--) { msg[i] = c & 0xff; c >>= 8; }
      const hash = await this._hmac(this._b32decode(secret), msg);
      const off  = hash[19] & 0xf;
      const code = ((hash[off] & 0x7f) << 24 | hash[off+1] << 16 | hash[off+2] << 8 | hash[off+3]) % 1000000;
      if (code.toString().padStart(6, '0') === token.trim()) return true;
    }
    return false;
  }
};

/* ── Estado temporário do login ── */
let _loginPending = null;

/* ── Mostrar/ocultar senha ── */
function loginTogglePass(btn) {
  const inp = document.getElementById('login-pass');
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

/* ── Injetar etapa MFA no painel de login ── */
function _showLoginMFA() {
  const panel = document.querySelector('#page-login .cad-panel');
  if (!panel) return;

  // Oculta o formulário existente
  const form = document.getElementById('form-login-new');
  const divOr = panel.querySelector('.cad-divider-or');
  const btnGoogle = panel.querySelector('.cad-btn-google');
  const loginLink = panel.querySelector('.cad-login-link');
  [form, divOr, btnGoogle, loginLink].forEach(el => { if (el) el.style.display = 'none'; });

  // Remove etapa MFA anterior se existir
  const old = document.getElementById('login-mfa-step');
  if (old) old.remove();

  const mfaDiv = document.createElement('div');
  mfaDiv.id = 'login-mfa-step';
  mfaDiv.style.cssText = 'text-align:center';
  mfaDiv.innerHTML = `
    <div style="font-size:1.8rem;color:#c9a84c;margin-bottom:.8rem">&#128272;</div>
    <h3 style="font-family:'Cinzel',serif;color:#c9a84c;letter-spacing:3px;margin-bottom:.5rem">VERIFICAÇÃO MFA</h3>
    <p style="color:#a08060;font-size:.9rem;margin-bottom:1.2rem">Abra o <strong style="color:#e8d5b0">Google Authenticator</strong> e insira o código.</p>
    <div class="cad-input-wrap" style="max-width:200px;margin:0 auto .5rem">
      <span class="cad-inp-icon">&#128272;</span>
      <input type="text" id="login-mfa-code" placeholder="000000" maxlength="6"
        style="text-align:center;letter-spacing:6px;font-size:1.2rem" />
    </div>
    <div id="login-mfa-err" style="font-family:'Cinzel',serif;font-size:.65rem;color:#c0392b;margin:.3rem 0 .8rem;min-height:.9rem"></div>
    <button class="cad-btn-register" onclick="Auth.confirmMFA()" style="margin-bottom:.5rem">
      <span class="cad-btn-deco">&#10022;</span> VERIFICAR <span class="cad-btn-deco">&#10022;</span>
    </button>
    <button onclick="Auth.cancelMFA()" style="background:none;border:none;color:#6a5040;font-size:.75rem;cursor:pointer;font-family:'Cinzel',serif;display:block;width:100%">&#8592; Voltar</button>
  `;
  panel.appendChild(mfaDiv);
  setTimeout(() => { const el = document.getElementById('login-mfa-code'); if (el) el.focus(); }, 100);
}

function _hideLoginMFA() {
  const panel = document.querySelector('#page-login .cad-panel');
  if (!panel) return;
  const mfaDiv = document.getElementById('login-mfa-step');
  if (mfaDiv) mfaDiv.remove();
  const form = document.getElementById('form-login-new');
  const divOr = panel.querySelector('.cad-divider-or');
  const btnGoogle = panel.querySelector('.cad-btn-google');
  const loginLink = panel.querySelector('.cad-login-link');
  [form, divOr, btnGoogle, loginLink].forEach(el => { if (el) el.style.display = ''; });
}

/* ── Sobrescreve Auth.loginEmail para suportar MFA ── */
const _origLoginEmail = Auth.loginEmail.bind(Auth);
Auth.loginEmail = async function(e) {
  e.preventDefault();
  const errEl = document.getElementById('login-err');
  errEl.textContent = '';
  errEl.style.display = 'none';

  const email = (document.getElementById('login-email').value || '').trim().toLowerCase();
  const pass  = (document.getElementById('login-pass').value  || '');

  if (!email || !email.includes('@')) { errEl.textContent = '⚔ Informe seu e-mail.'; errEl.style.display = 'block'; return; }
  if (!pass)  { errEl.textContent = '⚔ Informe sua senha.';  errEl.style.display = 'block'; return; }

  // Busca conta
  let acc = null;
  try { const list = JSON.parse(localStorage.getItem('cos_accounts') || '[]'); acc = list.find(a => a.email === email) || null; } catch(_) {}
  if (!acc && typeof DB !== 'undefined' && DB.findByEmail) { try { acc = DB.findByEmail(email); } catch(_) {} }

  if (!acc) { errEl.textContent = '⚔ E-mail não cadastrado.'; errEl.style.display = 'block'; return; }

  // Verifica senha
  const buf  = new TextEncoder().encode(pass);
  const h    = await crypto.subtle.digest('SHA-256', buf);
  const hash = Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('');
  if (acc.password !== hash) { errEl.textContent = '⚔ Senha incorreta.'; errEl.style.display = 'block'; return; }

  // Verifica MFA
  if (acc.mfaSecret) {
    _loginPending = acc;
    _showLoginMFA();
    return;
  }

  // Login direto
  _finishLogin(acc);
};

Auth.confirmMFA = async function() {
  const code  = (document.getElementById('login-mfa-code').value || '').trim();
  const errEl = document.getElementById('login-mfa-err');
  errEl.textContent = '';

  if (!code || code.length !== 6) { errEl.textContent = '⚔ Digite o código de 6 dígitos.'; return; }
  const ok = await LoginTOTP.verify(_loginPending.mfaSecret, code);
  if (!ok) { errEl.textContent = '⚔ Código inválido. Tente novamente.'; return; }

  _hideLoginMFA();
  _finishLogin(_loginPending);
  _loginPending = null;
};

Auth.cancelMFA = function() {
  _loginPending = null;
  _hideLoginMFA();
};

function _finishLogin(acc) {
  Auth._save({ id: acc.id, name: acc.name, email: acc.email, provider: acc.provider || 'email' });
  window.location.href = 'home.html';
}

/* Mostra botão admin quando a página de login está ativa */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const loginPage = document.getElementById('page-login');
    const btn = document.getElementById('btn-admin-login');
    if (!loginPage || !btn) return;
    btn.style.display = loginPage.classList.contains('active') ? 'flex' : 'none';
  });
  const loginPage = document.getElementById('page-login');
  if (loginPage) observer.observe(loginPage, { attributes: true, attributeFilter: ['class'] });
});

/* ── Acesso Administrador ── */
const ADMIN_EMAIL = atob('aGlsbGFyeWNsZW1lbnRyb0BhZG1pbi5jb3M=');
const ADMIN_PASS  = atob('aGlsbGFyeXJvZHJpZ3Vlcw==');

const LoginAdmin = {
  open() {
    const m = document.getElementById('modal-admin-login');
    if (m) { m.style.display = 'flex'; setTimeout(() => document.getElementById('adm-login-email').focus(), 100); }
  },
  close() {
    const m = document.getElementById('modal-admin-login');
    if (m) m.style.display = 'none';
    const errEl = document.getElementById('adm-login-err');
    if (errEl) errEl.style.display = 'none';
    const e = document.getElementById('adm-login-email'); if (e) e.value = '';
    const p = document.getElementById('adm-login-pass');  if (p) p.value = '';
  },
  async login() {
    const email = (document.getElementById('adm-login-email').value || '').trim().toLowerCase();
    const pass  = (document.getElementById('adm-login-pass').value  || '');
    const errEl = document.getElementById('adm-login-err');
    errEl.style.display = 'none';

    const buf  = new TextEncoder().encode(pass);
    const h    = await crypto.subtle.digest('SHA-256', buf);
    const hash = Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('');
    const adminBuf  = new TextEncoder().encode(ADMIN_PASS);
    const adminH    = await crypto.subtle.digest('SHA-256', adminBuf);
    const adminHash = Array.from(new Uint8Array(adminH)).map(b => b.toString(16).padStart(2,'0')).join('');

    if (email !== ADMIN_EMAIL || hash !== adminHash) {
      errEl.textContent = '⚔ Credenciais de administrador inválidas.';
      errEl.style.display = 'block';
      return;
    }

    this.close();
    Auth._save({ id: 'admin', name: 'Hillary Rodrigues', email: ADMIN_EMAIL, provider: 'admin', role: 'admin' });
    window.location.href = 'home.html';
  }
};

/* Fechar modal admin clicando fora */
document.addEventListener('DOMContentLoaded', () => {
  const m = document.getElementById('modal-admin-login');
  if (m) m.addEventListener('click', e => { if (e.target === m) LoginAdmin.close(); });
  ['adm-login-email','adm-login-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') LoginAdmin.login(); });
  });
});
