import { Toast } from './Toast.js';

export class UIManager {
  constructor(userManager) {
    this.userManager = userManager;
    this.tableBody = document.querySelector('#users-table tbody');
    this.form = document.querySelector('#user-form');
    this.submitBtn = document.querySelector('#submit-btn');
    this.idInput = document.querySelector('#user-id');
    this.nameInput = document.querySelector('#name');
    this.emailInput = document.querySelector('#email');
    this.ageInput = document.querySelector('#age');
  }

  render() {
    const users = this.userManager.getAll();
    this.tableBody.innerHTML = users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.age}</td>
        <td>
          <button data-action="edit" data-id="${u.id}">✏️</button>
          <button data-action="delete" data-id="${u.id}">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  clearForm() {
    this.idInput.value = '';
    this.nameInput.value = '';
    this.emailInput.value = '';
    this.ageInput.value = '';
    this.submitBtn.textContent = 'Add User';
  }

  prefillForm(user) {
    this.idInput.value = user.id;
    this.nameInput.value = user.name;
    this.emailInput.value = user.email;
    this.ageInput.value = user.age;
    this.submitBtn.textContent = 'Update User';
  }

  bindEvents() {
    // Form submit
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const data = {
          name: this.nameInput.value,
          email: this.emailInput.value,
          age: this.ageInput.value
        };
        const id = this.idInput.value;

        if (id) {
          await this.userManager.updateUser(id, data);
          Toast.success('User updated!');
        } else {
          await this.userManager.addUser(data);
          Toast.success('User added!');
        }

        this.render();
        this.clearForm();
      } catch (err) {
        Toast.error(err.message);
      }
    });

    // Table actions
    this.tableBody.addEventListener('click', async (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      if (action === 'edit') {
        const user = this.userManager.getUser(id);
        this.prefillForm(user);
      } else if (action === 'delete') {
        if (confirm('Delete this user?')) {
          await this.userManager.deleteUser(id);
          Toast.info('User deleted');
          this.render();
        }
      }
    });
  }
}
