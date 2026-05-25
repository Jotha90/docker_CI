/* ============================
   script.js
   Lógica principal de la app
============================ */

let editRowElement = null; // Fila actual en edición

/* --- Navegación principal --- */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  const targetPage = document.getElementById(pageId);
  const displayStyle = ['page-login', 'page-dashboard'].includes(pageId) ? 'flex' : 'block';
  targetPage.style.display = displayStyle;
}

/* --- Login --- */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form-element');
  const loginError = document.getElementById('login-error');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === 'admin' && password === 'admin') {
        showPage('page-dashboard');
        loginError.style.display = 'none';
      } else {
        loginError.style.display = 'block';
      }
    });
  }

  /* --- Navegación lateral --- */
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelectorAll('.sidebar-nav .nav-link, .dashboard-section')
        .forEach(el => el.classList.remove('active'));

      this.classList.add('active');
      document.getElementById(this.getAttribute('data-target')).classList.add('active');
    });
  });

  /* --- Logout --- */
  const logoutBtn = document.getElementById('logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      loginForm.reset();
      showPage('page-login');
    });
  }

  /* Inicializar en Home */
  showPage('page-home');
});

/* --- Modal y CRUD --- */
const modal = document.getElementById('crud-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalSaveBtn = document.getElementById('modal-save-btn');

function openModal(mode, type, element = null) {
  editRowElement = mode === 'edit' ? element.closest('tr') : null;

  if (type === 'service') {
    modalTitle.textContent = mode === 'add' ? 'Agregar Nuevo Servicio' : 'Editar Servicio';

    const service = editRowElement
      ? {
          id: editRowElement.cells[0].textContent,
          name: editRowElement.cells[1].textContent,
          price: editRowElement.cells[2].textContent
        }
      : { id: '', name: '', price: '' };

    modalBody.innerHTML = `
      <div class="form-group">
        <label>Nombre del Servicio:</label>
        <input type="text" id="service-name" value="${service.name}">
      </div>
      <div class="form-group">
        <label>Precio:</label>
        <input type="text" id="service-price" value="${service.price}">
      </div>
    `;

    modalSaveBtn.onclick = () => saveService();
  } else if (type === 'user') {
    modalTitle.textContent = mode === 'add' ? 'Agregar Nuevo Usuario' : 'Editar Usuario';

    const user = editRowElement
      ? {
          id: editRowElement.cells[0].textContent,
          name: editRowElement.cells[1].textContent,
          email: editRowElement.cells[2].textContent,
          role: editRowElement.cells[3].textContent
        }
      : { id: '', name: '', email: '', role: '' };

    modalBody.innerHTML = `
      <div class="form-group">
        <label>Nombre Completo:</label>
        <input type="text" id="user-name" value="${user.name}">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" id="user-email" value="${user.email}">
      </div>
      <div class="form-group">
        <label>Rol:</label>
        <input type="text" id="user-role" value="${user.role}">
      </div>
    `;

    modalSaveBtn.onclick = () => saveUser();
  }

  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
  }, 10);
}

function closeModal() {
  modal.style.opacity = 0;
  modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function saveService() {
  const name = document.getElementById('service-name').value;
  const price = document.getElementById('service-price').value;

  if (!name || !price) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (editRowElement) {
    editRowElement.cells[1].textContent = name;
    editRowElement.cells[2].textContent = price;
  } else {
    const tableBody = document.getElementById('services-table-body');
    const newId = tableBody.rows.length + 10;
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${name}</td>
      <td>${price}</td>
      <td class="actions-cell">
        <button class="button-secondary" onclick="openModal('edit', 'service', this)">Editar</button>
        <button class="button-danger" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
  }
  closeModal();
}

function saveUser() {
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const role = document.getElementById('user-role').value;

  if (!name || !email || !role) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (editRowElement) {
    editRowElement.cells[1].textContent = name;
    editRowElement.cells[2].textContent = email;
    editRowElement.cells[3].textContent = role;
  } else {
    const tableBody = document.getElementById('users-table-body');
    const newId = tableBody.rows.length + 200;
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${role}</td>
      <td class="actions-cell">
        <button class="button-secondary" onclick="openModal('edit', 'user', this)">Editar</button>
        <button class="button-danger" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
  }
  closeModal();
}

function deleteRow(element) {
  if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
    element.closest('tr').remove();
  }
}
