export const fetchPriests = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest`, {
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

export const fetchPriestByParishId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/getDataByParishId/${id}`, {
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

// export const storePriest = async (formData) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         })
//         const data = await response.json()
//         if (!response.ok) {
//             return { data: [], error: data.error }
//         } else {
//             return { data: data, error: null }
//         }
//     } catch (error) {
//         return { data: [], error: error }
//     }
// }

// export const updatePriest = async (formData) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/${formData.parish}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         })
//         const data = await response.json()
//         if (!response.ok) {
//             return { data: [], error: data.error }
//         } else {
//             return { data: data, error: null }
//         }
//     } catch (error) {
//         return { data: [], error: error }
//     }
// }

export const deletePriest = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/${formData._id}`, {
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

export const storePriest = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/`, {
            method: 'POST',
            body: formDataObject
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}

export const updatePriest = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/priest/${formData.parish}`, {
            method: 'PATCH',
            body: formDataObject
        })
        const data = await response.json()
        if (response.ok) {
            return { data: data, error: null }
        } else {
            return { data: [], error: data.error }
        }
    } catch (error) {
        return { data: [], error: error.message }
    }
}