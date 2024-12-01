import React, { useContext, useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import CustomCard from '../../components/CustomCard'
import { fetchChapelById, updateChapel } from '../../api/chapelApi'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

function AdminMaintenance() {
  return (
    <MasterAdmin>
      <Stack spacing={1}>
        <Typography variant='h4' fontWeight={'bold'}>Maintenance</Typography>
        <ChurchForm />
      </Stack>
    </MasterAdmin>
  )
}

function ChurchForm() {
  const { auth } = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await updateChapel(formData)
    if (error) {
      toast.error("Something went wrong")
    } else {
      toast.success("Successfully updated")
    }
  }

  const handleGetData = async () => {
    const { data, error } = await fetchChapelById(auth.user.parish._id)
    if (error) {
      toast.error("Server Error")
    } else {
      setFormData(data)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <CustomCard>
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography fontWeight={'bold'} display={'flex'} alignItems={'center'}>Church Information</Typography>
              <Button type='submit' variant='contained' >Save Changes</Button>
            </Box>
            <TextField
              name='chapel'
              label="Church Name"
              value={formData.chapel || ""}
              onChange={handleChange}
              disabled={editMode}
              required
            />
            <TextField
              name='address'
              label="Church Address"
              value={formData.address || ""}
              onChange={handleChange}
              disabled={editMode}
              required
            />
            <TextField
              name='code'
              label="Zip Code"
              value={formData.code || ""}
              onChange={handleChange}
              disabled={editMode}
              required
            />
            <Divider />
            <Typography>For Recieving Transaction</Typography>
            <TextField
              name='gcash'
              label="Set GCash Number"
              value={formData.gcash || ""}
              onChange={handleChange}
              disabled={editMode}
              required
            />
          </Stack>
        </form>
      </Box>
    </CustomCard>
  )
}

export default AdminMaintenance