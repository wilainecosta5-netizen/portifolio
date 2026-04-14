// ========== SMOOTH SCROLL PARA NAVEGAÇÃO ==========
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Botão "Explorar projetos" da seção sobre -> rolagem suave até projetos
const scrollBtn = document.getElementById('scrollToProjectsBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    const projetosSection = document.getElementById('projetos');
    if (projetosSection) {
      projetosSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ========== FORMULÁRIO: INTEGRAÇÃO DIRETA COM WHATSAPP (nome + email + msg) ==========
const form = document.getElementById('whatsappForm');
// Número do whatsapp para contato (pode ser alterado para o número desejado)
const PHONE_NUMBER = "5598999999999";   // mesmo número do exemplo +55 (98) 99999-9999

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Capturar campos
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');

  let nome = nomeInput.value.trim();
  let email = emailInput.value.trim();
  let mensagem = mensagemInput.value.trim();

  // Validação básica
  if (nome === "") {
    alert("✏️ Por favor, digite seu nome para que eu possa te conhecer!");
    nomeInput.focus();
    return;
  }
  if (email === "") {
    alert("📧 O e-mail é importante para eu te responder! Informe por favor.");
    emailInput.focus();
    return;
  }
  // validação simples de email
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ E-mail parece inválido. Ex: nome@dominio.com");
    emailInput.focus();
    return;
  }

  // Montar a mensagem para WhatsApp de forma amigável e profissional
  let mensagemCompleta = `🟢 *NOVO CONTATO - PORTFÓLIO*%0A%0A`;
  mensagemCompleta += `👤 *Nome:* ${encodeURIComponent(nome)}%0A`;
  mensagemCompleta += `📧 *E-mail:* ${encodeURIComponent(email)}%0A`;
  if (mensagem !== "") {
    mensagemCompleta += `💬 *Mensagem:* ${encodeURIComponent(mensagem)}%0A%0A`;
  } else {
    mensagemCompleta += `💬 *Mensagem:* Gostaria de saber mais sobre seus serviços.%0A%0A`;
  }
  mensagemCompleta += `📅 *Enviado via portfólio interativo*`;

  // Construir link do WhatsApp com o texto personalizado
  const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${mensagemCompleta}`;

  // Abrir WhatsApp em nova aba (funciona em mobile e desktop)
  window.open(whatsappURL, '_blank');

  // Opcional: reset parcial ou exibir confirmação
  const btnSubmit = form.querySelector('button[type="submit"]');
  const originalText = btnSubmit.innerHTML;
  btnSubmit.innerHTML = '<i class="fas fa-check-circle"></i> Redirecionando...';
  btnSubmit.disabled = true;
  setTimeout(() => {
    btnSubmit.innerHTML = originalText;
    btnSubmit.disabled = false;
  }, 2000);
});

// ========== ANIMAÇÃO COM INTERSECTION OBSERVER (MODERNA) ==========
const animatedElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adiciona a classe show que aciona a keyframe
      entry.target.classList.add('show');
      // Opcional: se quiser parar de observar após animar (otimização)
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }); // aciona um pouco antes para fluidez

animatedElements.forEach(el => {
  observer.observe(el);
});

// Garantir que elementos já visíveis no carregamento também ativem (fallback)
window.addEventListener('load', () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 100) {
      el.classList.add('show');
      observer.unobserve(el);
    }
  });
});

// Adicionar um pequeno hover interativo nos cards com mouse
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
  });
});

// Botão de contato também pode focar no formulário? (opcional)
const contactLinkInNav = document.querySelector('nav a[href="#contato"]');
if (contactLinkInNav) {
  contactLinkInNav.addEventListener('click', () => {
    setTimeout(() => {
      const nomeField = document.getElementById('nome');
      if (nomeField) nomeField.focus();
    }, 500);
  });
}

// efeito dinâmico no header ao scroll (pequeno detalhe de transparência)
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(85, 119, 54, 0.9)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.background = 'rgba(61, 90, 49, 0.75)';
    header.style.backdropFilter = 'blur(16px)';
  }
});