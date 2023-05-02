import { User } from '../classes/User.js'
import { userManager } from '../managers/UserManager.js'
import { hashear } from '../utils/criptografia.js'

export async function postUsersController(req, res, next) {

  const { email, password, firstName, lastName, age } = req.body

  const user = new User({
    email,
    password: hashear(password),
    firstName,
    lastName,
    age,
  })

  await userManager.saveUser(user)

  req.login(user, error => {
    if (error) {
      next(new Error('falló el login!'))
    } else {
      res.status(201).json(req.user)
    }
  })
}

export async function getUsersController(req, res, next) {
  const users = await userManager.getAllUsers()
  res.json(users)
}
