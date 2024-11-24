export const fetchSchedule = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule`, {
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

export const fetchScheduleByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule/getDataByUserId/${id}`, {
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

export const fetchScheduleByParishId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule/getDataByParishId/${id}`, {
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

export const storeSchedule = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule`, {
            method: 'POST',
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

export const updateSchedule = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule/${formData._id}`, {
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

export const deleteSchedule = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/schedule/${formData._id}`, {
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