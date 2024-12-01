export const fetchChapelData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/chapel`, {
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

export const fetchChapelById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/chapel/${id}`, {
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

export const updateChapel = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/chapel/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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

export const fetchChapelByUserId = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/chapel/fetchByUserId/${formData._id}`, {
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