export function badRequest(res, msg) {
    return res.status(400).json({ message: msg })
}
