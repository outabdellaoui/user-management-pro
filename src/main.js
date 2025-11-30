import { api } from './services/api.js';
import { UserManager } from './models/UserManager.js';
import { UIManager } from './ui/UIManager.js';
import { Toast } from './ui/Toast.js';

const userManager = new UserManager();
const ui = new UIManager(userManager);

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const stored = userManager.getAll();
    if (stored.length === 0) {
      const data = await api.get('data.json');
      await userManager.seed(data.users);
      Toast.info('Loaded initial users from data.json');
    }
  } catch (err) {
    Toast.error('Failed to load initial data');
  }

  ui.render();
  ui.bindEvents();
});
