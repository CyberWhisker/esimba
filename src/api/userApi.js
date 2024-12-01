export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/login`, {
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

export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/register`, {
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

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user`)
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

export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/${id}`)
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

export const fetchUserByChapelId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/getUsersByParishId/${id}`)
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

export const updateUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/${formData._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            return {data: [], error: "Something went wrong"}
        } else {
            const data = await response.json()
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const deleteUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/${formData._id}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            return {data: [], error: "Something went wrong"}
        } else {
            const data = await response.json()
            return {data: data, error: null}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}
