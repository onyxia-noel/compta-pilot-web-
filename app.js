const APP_URL = "maquette-complete.html";
const USER_KEY = "onyxia_demo_user";
const DATA_KEY = "onyxia_gestion_data_v4";

function emptyStateForAccount(account = {}) {
  return {
    settings: {
      businessName: account.company || "",
      logoText: "OG",
      email: account.email || "",
      phone: account.phone || "",
      website: "",
      address: "",
      brn: "",
      vatNumber: "",
      currency: account.currency || "EUR",
      bank: "",
      paymentTerms: "",
      legalText: "Les rapports sont fournis à titre de suivi interne et peuvent être exportés pour votre comptable."
    },
    clients: [],
    quotes: [],
    invoices: [],
    expenses: [],
    payments: [],
    documents: []
  };
}

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function showAuth(mode) {
  $$('[data-auth-tab]').forEach((button) => button.classList.toggle('active', button.dataset.authTab === mode));
  $$('[data-auth-form]').forEach((form) => form.classList.toggle('active', form.dataset.authForm === mode));
  $('#acces')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setStatus(selector, message, type = '') {
  const target = $(selector);
  if (!target) return;
  target.textContent = message;
  target.className = `status ${type}`.trim();
}

function openApp() {
  window.setTimeout(() => { window.location.href = APP_URL; }, 450);
}

$$('[data-auth-tab]').forEach((button) => {
  button.addEventListener('click', () => showAuth(button.dataset.authTab));
});

$$('[data-open-register]').forEach((link) => {
  link.addEventListener('click', () => showAuth('register'));
});

$$('[data-show-login]').forEach((link) => {
  link.addEventListener('click', () => showAuth('login'));
});

const registerForm = $('[data-auth-form="register"]');
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm).entries());
    if (!data.name || !data.email || !data.password) {
      setStatus('[data-register-status]', 'Remplis au minimum le nom, l’email et le mot de passe.', 'error');
      return;
    }
    if (data.password !== data.confirmPassword) {
      setStatus('[data-register-status]', 'Les deux mots de passe ne sont pas identiques.', 'error');
      return;
    }
    const account = {
      name: data.name,
      email: data.email,
      company: data.company || '',
      phone: data.phone || '',
      country: data.country || '',
      currency: data.currency || 'EUR',
      password: data.password,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(USER_KEY, JSON.stringify(account));
    localStorage.setItem(DATA_KEY, JSON.stringify(emptyStateForAccount(account)));
    setStatus('[data-register-status]', 'Compte créé. Votre espace démarre à zéro.', 'success');
    openApp();
  });
}

const loginForm = $('[data-auth-form="login"]');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    const saved = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    if (!saved) {
      setStatus('[data-login-status]', 'Aucun compte local trouvé. Crée d’abord un compte ou ouvre la démo.', 'error');
      showAuth('register');
      return;
    }
    const sameUser = [saved.email, saved.name, saved.phone].filter(Boolean).includes(data.username);
    if (!sameUser || saved.password !== data.password) {
      setStatus('[data-login-status]', 'Identifiants incorrects.', 'error');
      return;
    }
    setStatus('[data-login-status]', 'Connexion réussie. Ouverture de l’espace...', 'success');
    openApp();
  });
}
