export const fetchBaptism = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism`, {
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

export const fetchBaptismByUserId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism/getDataByUserId/${id}`, {
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

export const fetchBaptismByChapelId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism/getDataByChapelId/${id}`, {
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

export const storeBaptism = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism`, {
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

export const updateBaptism = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism/${dataForm._id}`, {
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

export const deleteBaptism = async (dataForm) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/baptism/${dataForm._id}`, {
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