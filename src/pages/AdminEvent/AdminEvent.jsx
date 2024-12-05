import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { Cancel, Delete as DeleteIcon, Edit, Save } from '@mui/icons-material';
import MasterAdmin from '../../layouts/MasterAdmin';
import CustomCard from '../../components/CustomCard';
import { deleteEvent, fetchEventsByParishId, updateEvent } from '../../api/eventApi';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import AlertModal from '../../components/AlertModal';
import Delete from './Form/Delete';

function AdminEvent() {
    return (
        <MasterAdmin>
            <Stack spacing={1}>
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
        {
            field: 'event_type',
            headerName: 'Event Type',
            flex: 1,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            type: 'singleSelect',
            valueOptions: ['Baptism', 'Burial', 'Marriage', 'Confirmation'],
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            editable: true,
            type: 'date',
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            flex: 1,
            editable: true,
            type: 'date',
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'slot',
            headerName: 'Slot',
            type: 'number',
            flex: 1,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
            type: 'singleSelect',
            valueOptions: [1, 2, 3, 4, 5],

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
export default AdminEvent