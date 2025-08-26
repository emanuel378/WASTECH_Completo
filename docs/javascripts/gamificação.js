document.addEventListener('DOMContentLoaded', function() {
  // Dropdown do perfil
  const profile = document.querySelector('.profile');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownIcon = document.querySelector('.dropdown-icon');

  profile.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    dropdownIcon.classList.toggle('rotate');
  });

  document.addEventListener('click', function() {
    dropdownMenu.classList.remove('show');
    dropdownIcon.classList.remove('rotate');
  });

  dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Modal de edição de perfil
  const modal = document.getElementById('profileModal');
  const editBtn = document.getElementById('editProfileBtn');
  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelEdit');
  const saveBtn = document.getElementById('saveProfile');
  const profilePicInput = document.getElementById('profile-pic-input');
  const profilePicPreview = document.getElementById('profilePicPreview');
  const profilePic = document.getElementById('profilePic');
  const userNameInput = document.getElementById('userName');
  const userLevelText = document.getElementById('userLevel');

  // Elementos do topo
  const profileNameSpan = document.querySelector('.profile-container .profile span');
  const profileCircleImg = document.querySelector('.profile-container .profile img');

  let userName = 'Leonardo';
  let userPhoto = profilePic.src;

  // Abrir modal
  editBtn.addEventListener('click', function() {
    userNameInput.value = userName;
    profilePicPreview.src = userPhoto;
    modal.style.display = 'block';
  });

  // Fechar modal
  function closeModal() {
    modal.style.display = 'none';
  }
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Atualizar preview da foto ao escolher arquivo
  profilePicInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        profilePicPreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Salvar perfil (nome e foto) e salvar no localStorage
  saveBtn.addEventListener('click', function() {
    const newName = userNameInput.value.trim();
    if (!newName) {
      alert('Por favor, insira um nome válido.');
      return;
    }
    userName = newName;

    // Atualizar nome no topo
    if (profileNameSpan) {
      // Mantém o ícone dropdown
      profileNameSpan.innerHTML = `${userName} <i class="fas fa-chevron-down dropdown-icon"></i>`;
    }
    // Atualizar alt da imagem pequena
    if (profileCircleImg) {
      profileCircleImg.alt = userName;
    }

    // Atualizar nome no perfil principal (se houver)
    // Exemplo: se quiser mostrar o nome abaixo da foto, adicione um elemento e atualize aqui

    // Atualizar foto se alterada
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        userPhoto = event.target.result;
        profilePic.src = userPhoto;
        if (profileCircleImg) profileCircleImg.src = userPhoto;
        profilePicPreview.src = userPhoto;
        localStorage.setItem('wastech_profilePhoto', userPhoto);
      };
      reader.readAsDataURL(file);
    } else {
      // Se não mudou a foto, salva a atual
      localStorage.setItem('wastech_profilePhoto', userPhoto);
    }

    localStorage.setItem('wastech_userName', userName);

    closeModal();
    alert('Perfil atualizado com sucesso!');
  });

  // Carregar dados salvos no localStorage
  function loadProfileData() {
    const savedName = localStorage.getItem('wastech_userName');
    const savedPhoto = localStorage.getItem('wastech_profilePhoto');

    if (savedName) {
      userName = savedName;
      if (profileNameSpan) {
        profileNameSpan.innerHTML = `${userName} <i class="fas fa-chevron-down dropdown-icon"></i>`;
      }
      if (profileCircleImg) profileCircleImg.alt = userName;
    }

    if (savedPhoto) {
      userPhoto = savedPhoto;
      profilePic.src = userPhoto;
      if (profileCircleImg) profileCircleImg.src = userPhoto;
    }
  }

  loadProfileData();

  // Atualizar nível de usuário (exemplo)
  function updateUserLevel() {
    const userXP = 125; // Exemplo fixo
    if (userXP >= 200) {
      userLevelText.textContent = 'Nível 5 – Mestre Verde';
    } else if (userXP >= 150) {
      userLevelText.textContent = 'Nível 4 – Especialista Ecológico';
    } else {
      userLevelText.textContent = 'Nível 3 – Agricultor Verde';
    }
  }
  updateUserLevel();

  // Nenhum código relacionado à edição de perfil deve ser executado fora do escopo da função principal.
  // Se você encontrar esse bloco de código solto (fora da função principal ou após o fechamento do </html>), remova completamente.
});
