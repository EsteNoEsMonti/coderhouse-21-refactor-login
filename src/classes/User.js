
export class User {
  constructor({ email, password, firstName, lastName, age }) {
    this.email = email
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.role = 'user'
  }
}