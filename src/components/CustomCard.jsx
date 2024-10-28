import { Card } from '@mui/material'
import React from 'react'

function CustomCard({children}) {
    return (
        <Card
            sx={{
                backgroundColor: 'rgba(128, 0, 0, 0.5)', 
                backdropFilter: 'blur(10px)', 
                boxShadow: 'none', 
                transition: 'background-color 0.3s ease',
                height: '100%'
            }}
        >
            {children}
        </Card>
    )
}

export default CustomCard