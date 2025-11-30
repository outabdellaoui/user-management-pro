import { User } from './User.js';
import { storage } from '../services/storage.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export class UserManager {
  #users = [];
  #nextId = 1;
  #storageKey = 'users-v1';

  constructor() {
    this.#loadFromStorage();
  }

  async addUser(data) {
    const id = this.#nextId++;
    const user = new User({ id, ...data });
    this.#users.push(user);
    await this.#save();
    return user;
  }

  getUser(id) {
    const user = this.#users.find(u => u.id === Number(id));
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async updateUser(id, data) {
    const user = this.getUser(id);
    user.update(data);
    await this.#save();
    return user;
  }

  async deleteUser(id) {
    const index = this.#users.findIndex(u => u.id === Number(id));
    if (index === -1) throw new NotFoundError('User not found');
    this.#users.splice(index, 1);
    await this.#save();
  }

  getAll() {
    return [...this.#users];
  }

  async #save() {
    await storage.set(this.#storageKey, this.#users.map(u => u.toJSON()));
  }

  #loadFromStorage() {
    const data = storage.get(this.#storageKey);
    if (data && Array.isArray(data)) {
      this.#users = data.map(u => new User(u));
      this.#nextId = Math.max(0, ...this.#users.map(u => u.id)) + 1;
    }
  }

  async seed(dataArray) {
    if (this.#users.length === 0 && Array.isArray(dataArray)) {
      this.#users = dataArray.map(u => new User(u));
      this.#nextId = Math.max(0, ...this.#users.map(u => u.id)) + 1;
      await this.#save();
    }
  }
}
