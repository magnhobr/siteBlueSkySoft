const CONTACT = {
  company: "BlueSkySoft",
  email: "contato@blueskysoft.com.br",
  whatsappE164: "5511950407441",
};

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function buildWhatsAppLink(message) {
  const base = `https://wa.me/${CONTACT.whatsappE164}`;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

function buildEmailLink(subject, body) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT.email}?${params.toString()}`;
}

function closeMenu() {
  const nav = qs("[data-nav]");
  const btn = qs("[data-menu-btn]");
  nav?.classList.remove("is-open");
  btn?.setAttribute("aria-label", "Abrir menu");
}

function initMenu() {
  const nav = qs("[data-nav]");
  const btn = qs("[data-menu-btn]");
  if (!nav || !btn) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  qsa("a[href^='#']", nav).forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function initContactLinks() {
  const whatsapp = qs("[data-whatsapp]");
  const email = qs("[data-email]");

  const defaultMsg =
    `Olá, ${CONTACT.company}! Quero automatizar minha revenda de veículos. ` +
    `Preciso de: (ex: WhatsApp para leads, estoque/anúncios, CRM de loja).`;

  if (whatsapp) whatsapp.href = buildWhatsAppLink(defaultMsg);
  if (email) email.href = buildEmailLink("Orçamento — BlueSkySoft", defaultMsg);
}

function initLeadForm() {
  const form = qs("[data-lead-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const empresa = String(data.get("empresa") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    const msg =
      `Olá, ${CONTACT.company}!\n\n` +
      `Nome: ${nome}\n` +
      (empresa ? `Empresa: ${empresa}\n` : "") +
      (whatsapp ? `WhatsApp: ${whatsapp}\n` : "") +
      `\nO que eu preciso:\n${mensagem}\n`;

    window.open(buildWhatsAppLink(msg), "_blank", "noopener,noreferrer");
  });
}

function initYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

initMenu();
initContactLinks();
initLeadForm();
initYear();
