export function getCurrentSessionController(req, res, next) {
    res.json(req.user)
}

export async function logoutSessionsController(req, res, next) {
    req.logout(err => {
        res.sendStatus(200)
    })
}

export function postSessionsController(req, res, next) {
    res.status(201).json(req.user)
}