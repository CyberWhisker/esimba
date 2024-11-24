export const fetchDeath = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/death`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return {data: [], error: data.error}
        } else {
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const fetchDeathByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/death/getDataByUserId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return {data: [], error: data.error}
        } else {
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const storeDeath = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/death`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm)
        })
        const data = await response.json()
        if (!response.ok) {
            return {data: [], error: data.error}
        } else {
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const updateDeath = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/death/${dataForm._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm)
        })
        const data = await response.json()
        if (!response.ok) {
            return {data: [], error: data.error}
        } else {
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const deleteDeath = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/death/${dataForm._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return {data: [], error: data.error}
        } else {
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}