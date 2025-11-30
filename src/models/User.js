import { ValidationError } from '../utils/errors.js';

export class User {
  #id;
  #name;
  #email;
  #age;

  constructor({ id, name, email, age }) {
    this.#id = Number(id);
    this.#name = name.trim();
    this.#email = email.trim();
    this.#age = Number(age);
    this.validate();
  }

  validate() {
    if (!this.#id || this.#id <= 0 || !Number.isInteger(this.#id))
      throw new ValidationError('Invalid ID');
    if (!this.#name || this.#name.length < 2)
      throw new ValidationError('Name must be at least 2 characters');
    if (!this.#email.includes('@') || !this.#email.includes('.'))
      throw new ValidationError('Invalid email format');
    if (this.#age < 1 || this.#age > 120)
      throw new ValidationError('Age must be between 1 and 120');
  }

  update(data) {
    if (data.name) this.#name = data.name.trim();
    if (data.email) this.#email = data.email.trim();
    if (data.age) this.#age = Number(data.age);
    this.validate();
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      age: this.#age
    };
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get age() { return this.#age; }
}
