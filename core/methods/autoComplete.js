export function autoComplete(name, all, search) {
    if (name == '') {
        return all
    }
    return all.filter((value) => {
        const nameMin = name.toLowerCase()
        const searchMin = value[search].toLowerCase()

        return searchMin.includes(nameMin)
    })
}
