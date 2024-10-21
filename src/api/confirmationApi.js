export const fetchConfirmation = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/confirmation`, {
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

export const storeConfirmation = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/confirmation`, {
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

export const updateConfirmation = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/confirmation/${dataForm._id}`, {
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

export const deleteConfirmation = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/confirmation/${dataForm._id}`, {
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