export function badRequest(res, msg, status) {
    return res.status(status).json({ message: msg })
}
