// Funções para controle das telas
function showScreen(screenId) {
  document.getElementById(screenId).classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeScreen(screenId) {
  document.getElementById(screenId).classList.remove("active");
  document.body.style.overflow = "";
}

// Função para carregar as FAQs na seção principal (limitado a 4 por categoria)
function loadFAQs() {
  const faqContent = document.getElementById("faq-content");
  faqContent.innerHTML = ""; // Limpa o conteúdo existente

  faqData.forEach(category => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("faq-category");
    categoryDiv.setAttribute("data-category", category.category);

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.textContent = category.category;
    categoryDiv.appendChild(categoryTitle);

    // Mostrar apenas as primeiras 4 perguntas
    category.questions.slice(0, 3).forEach(q => {
      const faqItem = document.createElement("div");
      faqItem.classList.add("faq-item");

      const faqQuestion = document.createElement("button");
      faqQuestion.classList.add("faq-question");
      faqQuestion.textContent = q.question;

      const faqAnswer = document.createElement("div");
      faqAnswer.classList.add("faq-answer", "hidden");
      faqAnswer.textContent = q.answer;

      faqItem.appendChild(faqQuestion);
      faqItem.appendChild(faqAnswer);
      categoryDiv.appendChild(faqItem);
    });

    // Adicionar botão "Ver Mais" se houver mais de 4 perguntas
    if (category.questions.length > 4) {
      const seeMoreBtn = document.createElement("button");
      seeMoreBtn.classList.add("btn-primary", "see-more-btn");
      seeMoreBtn.textContent = "Ver Mais";
      seeMoreBtn.setAttribute("data-category", category.category);
      categoryDiv.appendChild(seeMoreBtn);
    }

    faqContent.appendChild(categoryDiv);
  });
}

// Função para carregar todas as FAQs de uma categoria no modal
function loadFAQModal(categoryName) {
  const modalTitle = document.getElementById("faq-modal-title");
  const modalContent = document.getElementById("faq-modal-content");
  modalContent.innerHTML = ""; // Limpa o conteúdo do modal

  modalTitle.textContent = `Perguntas Frequentes - ${categoryName}`;

  const category = faqData.find(cat => cat.category === categoryName);
  if (category) {
    category.questions.forEach(q => {
      const faqItem = document.createElement("div");
      faqItem.classList.add("screen-section");

      const faqQuestion = document.createElement("h3");
      faqQuestion.classList.add("screen-section-title");
      faqQuestion.textContent = q.question;

      const faqAnswer = document.createElement("p");
      faqAnswer.classList.add("screen-text");
      faqAnswer.textContent = q.answer;

      faqItem.appendChild(faqQuestion);
      faqItem.appendChild(faqAnswer);
      modalContent.appendChild(faqItem);
    });
  }

  showScreen("faq-modal");
}

// Inicialização de event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Carregar FAQs
  loadFAQs();

  // Dropdown do perfil
  const profile = document.querySelector(".profile");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownIcon = document.querySelector(".dropdown-icon");

  if (profile && dropdownMenu && dropdownIcon) {
    profile.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
      dropdownIcon.classList.toggle("rotate");
    });

    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("show");
      dropdownIcon.classList.remove("rotate");
    });

    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // FAQ: Abrir e fechar respostas
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      answer.classList.toggle("show");
    });
  });

  // FAQ: Filtro por busca
  document.getElementById("faq-search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question").textContent.toLowerCase();
      const answer = item.querySelector(".faq-answer").textContent.toLowerCase();
      item.style.display = question.includes(query) || answer.includes(query) ? "" : "none";
    });
  });

  // FAQ: Botões "Ver Mais"
  document.querySelectorAll(".see-more-btn").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      loadFAQModal(category);
    });
  });

  // Botões de ranking
  document.getElementById("ranking-btn")?.addEventListener("click", () => {
    showScreen("ranking-total-screen");
  });

  // Botões de detalhes da horta
  document.querySelectorAll(".garden-detail-btn_01").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_01"));
  });
  document.querySelectorAll(".garden-detail-btn_02").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_02"));
  });
  document.querySelectorAll(".garden-detail-btn_03").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_03"));
  });
  document.querySelectorAll(".garden-detail-btn_04").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_04"));
  });
  document.querySelectorAll(".garden-detail-btn_05").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_05"));
  });
  document.querySelectorAll(".garden-detail-btn_06").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_06"));
  });
  document.querySelectorAll(".garden-detail-btn_07").forEach((button) => {
    button.addEventListener("click", () => showScreen("garden-detail-screen_07"));
  });

  // Fechar modais
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.addEventListener("click", (e) => {
      if (e.target === screen) {
        closeScreen(screen.id);
      }
    });
  });

  document.querySelectorAll(".screen-close").forEach((button) => {
    button.addEventListener("click", () => {
      const screen = button.closest(".screen");
      closeScreen(screen.id);
    });
  });

});