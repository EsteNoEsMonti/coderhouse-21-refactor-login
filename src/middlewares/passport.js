import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { validarQueSeanIguales } from '../utils/criptografia.js'
import { userManager } from '../managers/UserManager.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../classes/User.js'

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const buscado = await userManager.getUserByEmail(username)
    if (!buscado)
        return done(new Error('generic error from sessions/login/logout'))
    if (!validarQueSeanIguales(password, buscado.password))
        return done(new Error('generic error from sessions/login/logout'))
    // @ts-ignore
    delete buscado.password
    done(null, buscado)
}))

passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    let user
    try {
        user = await userManager.getUserByEmail(profile.username)
        if (!user) throw new Error('usuario no encontrado')
    } catch (error) {
        // @ts-ignore
        user = new User({
            firstName: profile.displayName,
            email: profile.username,
        })
        await userManager.saveUser(user)
    }
    done(null, user)
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })
