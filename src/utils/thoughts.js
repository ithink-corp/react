export async function getThoughts() {
    const res = await fetch('https://ithink-api.cyclic.app/', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const items = await res.json()
    return items.map((item) => ({
        message: item,
    }))
}

export async function postThought(message) {
    await fetch('https://ithink-api.cyclic.app/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: message,
        }),
    })
}
