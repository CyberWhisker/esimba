export const fetchReserved = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchReservedById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchReservedByEventId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/getDataByEventId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchReservedByParishId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/getDataByParishId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchReservedByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/getDataByUserId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const storeReserved = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateReserved = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteReserved = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/reserved/${formData._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            return { data: [], error: data.error }
        } else {
            return { data: data, error: null }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}