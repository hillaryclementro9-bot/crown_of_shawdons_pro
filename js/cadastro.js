/* ============================================
   CROWN OF SHADOWS — cadastro.js
   Login/Cadastro + MFA (TOTP) + Google OAuth + Admin
   ============================================ */

/* ── Utilitários ── */
function togglePass(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

function setErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function clearErrs() {
  ['err-name','err-email','err-pass','err-pass2','err-terms','err-form','err-mfa']
    .forEach(id => setErr(id, ''));
}

async function hashPass(pass) {
  const buf = new TextEncoder().encode(pass);
  const h   = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function getAccounts() {
  try { return JSON.parse(localStorage.getItem('cos_accounts') || '[]'); } catch { return []; }
}
function saveAccounts(arr) { localStorage.setItem('cos_accounts', JSON.stringify(arr)); }

/* ── TOTP (RFC 6238) — sem dependência externa ── */
const TOTP = {
  /* Gera segredo aleatório Base32 (20 bytes) */
  generateSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const bytes = crypto.getRandomValues(new Uint8Array(20));
    return Array.from(bytes).map(b => chars[b % 32]).join('');
  },

  /* Base32 decode */
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

  /* HMAC-SHA1 */
  async _hmac(keyBytes, msgBytes) {
    const key = await crypto.subtle.importKey('raw', keyBytes, { name:'HMAC', hash:'SHA-1' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, msgBytes);
    return new Uint8Array(sig);
  },

  /* Gera código TOTP para o momento atual */
  async generate(secret) {
    const counter = Math.floor(Date.now() / 1000 / 30);
    const msg = new Uint8Array(8);
    let c = counter;
    for (let i = 7; i >= 0; i--) { msg[i] = c & 0xff; c >>= 8; }
    const key  = this._b32decode(secret);
    const hash = await this._hmac(key, msg);
    const off  = hash[19] & 0xf;
    const code = ((hash[off] & 0x7f) << 24 | hash[off+1] << 16 | hash[off+2] << 8 | hash[off+3]) % 1000000;
    return code.toString().padStart(6, '0');
  },

  /* Verifica código (janela ±1 período) */
  async verify(secret, token) {
    const counter = Math.floor(Date.now() / 1000 / 30);
    for (const delta of [-1, 0, 1]) {
      const c = counter + delta;
      const msg = new Uint8Array(8);
      let tmp = c;
      for (let i = 7; i >= 0; i--) { msg[i] = tmp & 0xff; tmp >>= 8; }
      const key  = this._b32decode(secret);
      const hash = await this._hmac(key, msg);
      const off  = hash[19] & 0xf;
      const code = ((hash[off] & 0x7f) << 24 | hash[off+1] << 16 | hash[off+2] << 8 | hash[off+3]) % 1000000;
      if (code.toString().padStart(6,'0') === token.trim()) return true;
    }
    return false;
  },

  /* URL para QR Code (otpauth://) */
  otpauthURL(secret, email) {
    const issuer = 'CrownOfShadows';
    return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(email)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
  }
};

/* ── QR Code via API pública ── */
function renderQR(url, containerId) {
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
  img.alt = 'QR Code MFA';
  img.style.cssText = 'width:180px;height:180px;display:block';
  const c = document.getElementById(containerId);
  c.innerHTML = '';
  c.appendChild(img);
}

/* ── Estado temporário do cadastro ── */
let _pendingAccount = null;

/* ── Validação do formulário ── */
function validate() {
  clearErrs();
  let ok = true;
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  const terms = document.getElementById('reg-terms').checked;

  if (!name)  { setErr('err-name',  '⚔ Informe seu nome de aventureiro.'); ok = false; }
  if (!email) { setErr('err-email', '⚔ Informe seu e-mail.'); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('err-email', '⚔ Formato de e-mail inválido.'); ok = false; }
  if (!pass)             { setErr('err-pass', '⚔ Crie uma senha.'); ok = false; }
  else if (pass.length < 8) { setErr('err-pass', '⚔ Mínimo 8 caracteres.'); ok = false; }
  if (!pass2)            { setErr('err-pass2', '⚔ Confirme sua senha.'); ok = false; }
  else if (pass !== pass2) { setErr('err-pass2', '⚔ As senhas não coincidem.'); ok = false; }
  if (!terms) { setErr('err-terms', '⚔ Aceite os Termos de Uso.'); ok = false; }
  return ok;
}

/* ── Submit do formulário ── */
document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validate()) return;

  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass  = document.getElementById('reg-pass').value;
  const mfa   = document.getElementById('reg-mfa').checked;

  const accounts = getAccounts();
  if (accounts.find(a => a.email === email)) {
    setErr('err-form', '⚔ Este e-mail já está cadastrado. Faça login.');
    return;
  }

  const hash = await hashPass(pass);

  if (mfa) {
    /* Gera segredo e mostra QR */
    const secret = TOTP.generateSecret();
    _pendingAccount = { name, email, password: hash, provider: 'email', mfaSecret: secret };
    const url = TOTP.otpauthURL(secret, email);
    renderQR(url, 'qr-container');
    document.getElementById('mfa-secret-display').textContent = secret;
    document.getElementById('step-form').style.display = 'none';
    document.getElementById('step-mfa').style.display  = 'block';
  } else {
    _createAccount({ name, email, password: hash, provider: 'email', mfaSecret: null });
  }
});

/* ── MFA: confirmar código ── */
const CadastroMFA = {
  async confirm() {
    const code = document.getElementById('mfa-verify-code').value.trim();
    if (!code || code.length !== 6) { setErr('err-mfa', '⚔ Digite o código de 6 dígitos.'); return; }
    const ok = await TOTP.verify(_pendingAccount.mfaSecret, code);
    if (!ok) { setErr('err-mfa', '⚔ Código inválido. Verifique o app e tente novamente.'); return; }
    _createAccount(_pendingAccount);
  },

  skip() {
    _pendingAccount = null;
    document.getElementById('step-mfa').style.display  = 'none';
    document.getElementById('step-form').style.display = 'block';
  }
};

function _createAccount(acc) {
  const accounts = getAccounts();
  const newAcc = {
    id:        Date.now().toString(),
    name:      acc.name,
    email:     acc.email,
    password:  acc.password,
    provider:  acc.provider,
    mfaSecret: acc.mfaSecret || null,
    createdAt: new Date().toISOString()
  };
  accounts.push(newAcc);
  saveAccounts(accounts);
  sessionStorage.setItem('cos_user', JSON.stringify({ id: newAcc.id, name: newAcc.name, email: newAcc.email, provider: newAcc.provider }));

  document.getElementById('step-form').style.display = 'none';
  document.getElementById('step-mfa').style.display  = 'none';
  const ok = document.getElementById('form-ok');
  ok.classList.remove('hidden');
  setTimeout(() => { window.location.href = '../home.html'; }, 1500);
}

/* ── Google OAuth (Identity Services) ── */
document.getElementById('btn-google-cad').addEventListener('click', () => {
  if (typeof google === 'undefined' || !google.accounts) {
    alert('Google Sign-In não carregou. Verifique sua conexão.');
    return;
  }
  google.accounts.id.initialize({
    client_id: 'SEU_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    callback: _handleGoogleCad
  });
  google.accounts.id.prompt();
});

async function _handleGoogleCad(response) {
  /* Decodifica JWT do Google (payload) */
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  const email   = payload.email.toLowerCase();
  const name    = payload.name || email.split('@')[0];

  const accounts = getAccounts();
  let acc = accounts.find(a => a.email === email);

  if (!acc) {
    /* Cria conta automaticamente via Google */
    acc = { id: Date.now().toString(), name, email, password: null, provider: 'google', mfaSecret: null, createdAt: new Date().toISOString() };
    accounts.push(acc);
    saveAccounts(accounts);
  }

  sessionStorage.setItem('cos_user', JSON.stringify({ id: acc.id, name: acc.name, email: acc.email, provider: 'google' }));
  window.location.href = '../index.html';
}

/* ── Acesso Administrador ── */
const ADMIN_EMAIL = 'hillaryclementro@admin.cos';
const ADMIN_PASS  = 'hillaryrodrigues';

const AdminAccess = {
  open() {
    const m = document.getElementById('modal-admin');
    m.style.display = 'flex';
    setTimeout(() => document.getElementById('adm-email').focus(), 100);
  },
  close() {
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('adm-err').style.display = 'none';
    document.getElementById('adm-email').value = '';
    document.getElementById('adm-pass').value  = '';
  },
  async login() {
    const email = (document.getElementById('adm-email').value || '').trim().toLowerCase();
    const pass  = (document.getElementById('adm-pass').value  || '');
    const errEl = document.getElementById('adm-err');
    errEl.style.display = 'none';

    const hash = await hashPass(pass);
    const adminHash = await hashPass(ADMIN_PASS);

    if (email !== ADMIN_EMAIL || hash !== adminHash) {
      errEl.textContent = '⚔ Credenciais de administrador inválidas.';
      errEl.style.display = 'block';
      return;
    }

    sessionStorage.setItem('cos_user', JSON.stringify({ id: 'admin', name: 'Hillary Rodrigues', email: ADMIN_EMAIL, provider: 'admin', role: 'admin' }));
    this.close();
    window.location.href = '../index.html';
  }
};

/* Fechar modal admin clicando fora */
document.getElementById('modal-admin').addEventListener('click', function(e) {
  if (e.target === this) AdminAccess.close();
});

/* Enter nos campos admin */
['adm-email','adm-pass'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') AdminAccess.login(); });
});
