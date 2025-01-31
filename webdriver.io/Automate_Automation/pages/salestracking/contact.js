/**
 * Contact Class
 *
 * @class
 * @classdesc Main class to access the LocalStorage data
 */

class Contact {
  // private properties
  #firstNamePvt;

  #lastNamePvt;

  #firstNameList;

  #lastNameList;

  constructor() {
    this.#firstNameList = [
      'Aaron', 'Alex', 'Anna', 'Andrew', 'Ashley', 'Austin', 'Brandon', 'Burt', 'Chris', 'Daniel',
      'Danielle', 'David', 'Ethan', 'Emma', 'Emily', 'Francine', 'Georgia', 'Hannah', 'Harry',
      'Irene', 'Jack', 'Jerry', 'Jessica', 'John', 'Katie', 'Larry', 'Lauren', 'Mary', 'Matthew',
      'Michael', 'Nick', 'Nora', 'Olivia', 'Oscar', 'Paul', 'Quentin', 'Rachel', 'Ryan', 'Samantha',
      'Sarah', 'Sharon', 'Taylor', 'Tony', 'Tyler', 'Ursula', 'Victoria', 'Wayne', 'Xavier', 'York',
      'Zara',
    ];
    this.#lastNameList = [
      'Adams', 'Allen', 'Anderson', 'Baker', 'Brown', 'Butler', 'Carter', 'Clark', 'Davis', 'Evans',
      'Foster', 'Garcia', 'Green', 'Hall', 'Harris', 'Hernandez', 'Hill', 'Iglesias', 'Jackson',
      'Jones', 'Johnson', 'King', 'Lee', 'Lewis', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell',
      'Moore', 'Nelson', 'Ortiz', 'Perez', 'Phillips', 'Robinson', 'Rodriguez', 'Scott', 'Smith',
      'Taylor', 'Thomas', 'Thompson', 'Uecker', 'Vincent', 'Walker', 'White', 'Williams', 'Wilson',
      'Wright', 'Young', 'Zack',
    ];
    this.createContact();
  }

  /**
   * createContact - Create a first and last name for a contact from a list of 50 names
   */
  createContact() {
    this.#firstNamePvt = this.#firstNameList[this.#randomName()];
    this.#lastNamePvt = this.#lastNameList[this.#randomName()];
  }

  /**
   * randomName - generate a random number until 50
   * used to get the name in array
   * @returns {number}
   */
  #randomName() {
    return Math.floor(Math.random() * 50);
  }

  /** firstName return the first name of contact
   * @type {string}
   */
  get firstName() { return this.#firstNamePvt; }

  /** lastName return the lastName name of contact
   * @type {string}
   */
  get lastName() { return this.#lastNamePvt; }

  /** fullName return the full name (first _ last name) of contact
   * @type {string}
   */
  get fullName() { return `${this.#firstNamePvt} ${this.#lastNamePvt}`; }

  /** email return the email of contact
   * @type {string}
   */
  get email() { return `qatest+${this.#firstNamePvt}.${this.#lastNamePvt}@salesfloor.net`.toLowerCase(); }
}
module.exports = new Contact();
