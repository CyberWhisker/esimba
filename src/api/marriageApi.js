export const fetchMarriage = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/marriage`, {
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

export const storeMarriage = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/marriage`, {
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

export const updateMarriage = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/marriage/${dataForm._id}`, {
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

export const deleteMarraige = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/marriage/${dataForm._id}`, {
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