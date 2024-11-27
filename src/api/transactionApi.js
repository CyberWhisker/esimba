export const fetchTransactions = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction`, {
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

export const fetchTransactionByRequestId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction/getDataByRequestId/${id}`, {
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

export const fetchTransactionByChapelId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction/getDataByChapelId/${id}`, {
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

export const updateTransaction = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction/${formData._id}`, {
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

export const deleteTransaction = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction/${formData._id}`, {
            method: 'DELETE',
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

export const storeTransaction = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/transaction`, {
            method: 'POST',
            body: formDataObject
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