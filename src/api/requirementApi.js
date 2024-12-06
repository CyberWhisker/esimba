export const fetchRequirementByReserveId = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/requirement/getDataByReserveId/${id}`, {
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