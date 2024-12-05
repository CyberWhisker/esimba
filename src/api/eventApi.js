export const fetchEvents = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event`, {
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

export const fetchEventById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event/${id}`, {
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

export const fetchEventsByParishId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event/getDataByParishId/${id}`, {
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

export const storeEvent = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event`, {
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

export const updateEvent = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event/${formData._id}`, {
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

export const deleteEvent = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/event/${id}`, {
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