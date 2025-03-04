import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Grid2, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { Cancel, Delete as DeleteIcon, Edit, Save } from '@mui/icons-material';
import MasterAdmin from '../../layouts/MasterAdmin';
import CustomCard from '../../components/CustomCard';
import { deleteEvent, fetchEvents, fetchEventsByParishId, updateEvent } from '../../api/eventApi';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import AlertModal from '../../components/AlertModal';
import Delete from './Form/Delete';
import { fetchPriestByParishId, storePriest, updatePriest } from '../../api/priestApi';

function AdminEvent() {
    return (
        <MasterAdmin>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Priest Maintenance</Typography>
                <PriestDetails />
                <Typography variant='h4' fontWeight={'bold'}>Event Maintenance</Typography>
                <CustomCard>
                    <DataTable />
                </CustomCard>
            </Stack>
        </MasterAdmin>
    )
}

function DataTable() {
    const { auth } = useContext(AuthContext)
    const theme = useTheme()
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [deleteModal, setDeleteModal] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setSelected(id)
        setDeleteModal(true)
    };

    const confirmDelete = async () => {
        const { data, error } = await deleteEvent(selected)
        if (!error) {
            toast.success("Successfully Deleted")
            setRows(rows.filter((row) => row.id !== selected));
        }
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const { data, error } = await updateEvent(newRow)
        if (!error) {
            toast.success("Successfully updated")
        }
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleGetData = async () => {
        if (auth.user.role === 2) {
            const { data, error } = await fetchEventsByParishId(auth.user.parish._id)
            if (error) {
                toast.error("Server Errro")
            } else {
                const formatedData = data.map((item) => ({
                    ...item,
                    id: item._id,
                    startDate: moment(item.startDate).toDate(),
                    endDate: moment(item.endDate).toDate()
                }))
                setRows(formatedData)
            }
        } else {
            const { data, error } = await fetchEvents()
            if (error) {
                toast.error("Server Errro")
            } else {
                const formatedData = data.map((item) => ({
                    ...item,
                    id: item._id,
                    startDate: moment(item.startDate).toDate(),
                    endDate: moment(item.endDate).toDate()
                }))
                setRows(formatedData)
            }
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const columns = [
        {
            field: 'event',
            headerName: 'Event',
            flex: 1,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        ...(auth.user.role === 1
            ? [{
                field: 'parish',
                headerName: 'Parish',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'headerStyle',
                renderCell: (params) => (
                    <Box sx={{ textAlign: 'center' }}>
                        {params.row.parish.chapel}
                    </Box>
                )
            }]
            : []),
        {
            field: 'priest',
            headerName: 'Priest',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    {params.row.priest?.name ? (
                        <Stack spacing={1} direction='row' alignItems={'center'}>
                            <Avatar src={`/profileImg/${params.row.priest.image}`} />
                            <Typography >
                                {params.row.priest.name}
                            </Typography>
                        </Stack>
                    ) : 'Unavailable'}
                </Box>
            )
        },
        {
            field: 'event_type',
            headerName: 'Event Type',
            editable: true,
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            type: 'singleSelect',
            valueOptions: ['Baptism', 'Burial', 'Marriage', 'Confirmation'],
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            editable: true,
            type: 'date',
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            editable: true,
            type: 'date',
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'slot',
            headerName: 'Slot',
            type: 'number',
            editable: true,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            type: 'singleSelect',
            valueOptions: [1, 2, 3, 4, 5],

        },
        {
            field: 'status',
            headerName: 'Status',
            editable: auth.user.role == 1 ? true : false,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            type: 'singleSelect',
            valueOptions: ["Approved", "Pending", "Cancel"],

        },
        {
            field: 'actions',
            type: 'actions',
            headerAlign: 'center',
            headerName: 'Actions',
            headerClassName: 'headerStyle',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                '& .headerStyle': {
                    backgroundColor: theme.palette.warning.main,
                },
                height: '70vh',
            }}
        >
            <DataGrid
                sx={{ height: '100%' }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
            />
            <AlertModal open={deleteModal} onClose={() => setDeleteModal(false)}>
                <Delete onClose={() => setDeleteModal(false)} confirmDelete={confirmDelete} />
            </AlertModal>
        </Box>
    );
}

function PriestDetails() {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = {
            ...formData,
            parish: auth.user.parish._id
        }
        const { data, error } = await fetchPriestByParishId(auth.user.parish._id)
        if (data) {
            const { data, error } = await updatePriest(newFormData)
            if (error) {
                toast.error("Server error")
            } else {
                toast.success("Successfully Submitted")
            }
        } else {
            const { data, error } = await storePriest(newFormData)
            if (error) {
                toast.error("Server error")
            } else {
                toast.success("Successfully Submitted")
            }
        }
    }

    const handleGetData = async () => {
        const { data, error } = await fetchPriestByParishId(auth.user.parish._id)
        if (error) {
            console.log("Server Error")
        } else {
            setFormData({
                image: data.image,
                parish: data.parish,
                name: data.name,
                position: data.position,
            })
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Grid2 container>
            <Grid2 size={5}>
                <CustomCard>
                    <form onSubmit={handleSubmit} style={{ padding: '2vh' }}>
                        <Stack spacing={2} direction={'row'} alignItems={'center'}>
                            <UpdateProfile formData={formData} setFormData={setFormData} />
                            <Stack spacing={1} sx={{ width: '100%' }}>
                                <TextField
                                    label='Name'
                                    name='name'
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    label='Position'
                                    name='position'
                                    value={formData.position || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Stack>
                        </Stack>
                        <Button type='submit' sx={{ marginTop: 2 }} variant='contained' color='warning' fullWidth>Save</Button>
                    </form>
                </CustomCard>
            </Grid2>
        </Grid2>
    )
}

function UpdateProfile({ formData, setFormData }) {
    const [preview, setPreview] = useState(null); // Store preview image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, file });
            setPreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    const handleAvatarClick = () => {
        document.getElementById('fileInput').click(); // Trigger file input
    };

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            <Avatar
                src={formData.image ? `/profileImg/${formData.image}` : preview}
                sx={{ height: '10vh', width: '10vh', cursor: 'pointer' }}
                onClick={handleAvatarClick}
            />
        </div>
    );
}
export default AdminEvent