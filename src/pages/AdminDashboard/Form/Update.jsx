import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Divider, Stack, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import moment from 'moment';
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { deleteSchedule, updateSchedule } from '../../../api/scheduleApi';
import { toast } from 'react-toastify';
import { storeEvent, updateEvent } from '../../../api/eventApi';
import { AuthContext } from '../../../context/AuthContext';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.success.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function Update({ selected, selectedEvent, handleGetData, selectedDate }) {
    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Time Schedule List:
                </Typography>
            </Box>
            <Box id="delete-modal-description">
                <Box sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        <Typography>Scheduled Events:</Typography>
                        <EventDatable selectedEvent={selectedEvent} handleGetData={handleGetData} />
                        <Divider />
                        <Typography>Scheduled Appointment:</Typography>
                        <DataTable selected={selected} handleGetData={handleGetData} />
                    </Stack>
                </Box>
            </Box>
            <Divider />
            {/* <SubmitData handleGetData={handleGetData} onClose={onClose} selected={selected} /> */}
        </>
    )
}

function DataTable({ selected, handleGetData }) {
    const [rows, setRows] = useState(
        selected.map((item) => ({
            id: item._id,
            name: `${item.request.user.firstName} ${item.request.user.middleName[0]}. ${item.request.user.lastName}`,
            certificate: item.request.certificate,
            startTime: moment(item.startTime).toDate(),
            endTime: moment(item.endTime).toDate(),
        }))
    );
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        const dataForm = {
            _id: newRow.id,
            startTime: moment(newRow.startTime),
            endTime: moment(newRow.endTime),
        }
        handleUpdateSchedule(dataForm)
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };

    const handleUpdateSchedule = async (formData) => {
        const { data, error } = await updateSchedule(formData)
        if (error) {
            toast.error("Server Error")
        } else {
            toast.success("Successfully Updated")
            handleGetData()
        }
    }

    const handleDeleteClick = async (id) => {
        const formData = {
            _id: id
        }
        const { data, error } = await deleteSchedule(formData)
        if (error) {
            toast.error("Server Error")
        } else {
            toast.success("Successfully Deleted")
            handleGetData()
        }
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, editable: false },
        { field: 'certificate', headerName: 'Event', flex: 1, editable: false },
        {
            field: 'startTime',
            headerName: 'Start Time',
            flex: 1,
            editable: true,
            type: 'dateTime'
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            type: 'dateTime',
            flex: 1,
            editable: true,

        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Delete />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            sx={{ height: '50vh' }}
            rows={rows}
            columns={columns}
            editMode="row"
            processRowUpdate={(updatedRow, originalRow) => handleProcessRowUpdate(updatedRow)}
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
        />
    );
}

function EventDatable({ selectedEvent, handleGetData }) {
    const {auth} = useContext(AuthContext)
    const [rows, setRows] = useState(
        selectedEvent.map((item) => ({
            id: item._id,
            event: item.event,
            startDate: moment(item.startDate).toDate(),
            endDate: moment(item.endDate).toDate(),
        }))
    );
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        if (newRow.isNew) {
            const dataForm = {
                parish: auth.user.parish._id,
                event: newRow.event,
                startDate: moment(newRow.startDate),
                endDate: moment(newRow.endDate),
            };
            handleStoreEvent(dataForm);
        } else {
            const dataForm = {
                _id: newRow.id,
                startDate: moment(newRow.startDate),
                endDate: moment(newRow.endDate),
            };
            handleUpdateEvent(dataForm);
        }
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };

    const handleStoreEvent = async (formData) => {
        const { data, error } = await storeEvent(formData);
        if (error) {
            toast.error('Server Error');
        } else {
            toast.success('Successfully Stored');
            handleGetData();
        }
    };

    const handleUpdateEvent = async (formData) => {
        const { data, error } = await updateEvent(formData);
        if (error) {
            toast.error('Server Error');
        } else {
            toast.success('Successfully Updated');
            handleGetData();
        }
    };

    const handleDeleteClick = async (id) => {
        const formData = { _id: id };
        const { data, error } = await deleteSchedule(formData);
        if (error) {
            toast.error('Server Error');
        } else {
            toast.success('Successfully Deleted');
            handleGetData();
        }
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleAddRow = () => {
        const id = `${Math.random()}`;
        const newRow = {
            id,
            event: '',
            startDate: null,
            endDate: null,
            isNew: true,
        };
        setRows((oldRows) => [...oldRows, newRow]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const columns = [
        { field: 'event', headerName: 'Event', flex: 1, editable: true },
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            editable: true,
            type: 'dateTime',
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            type: 'dateTime',
            flex: 1,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Delete />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            sx={{ height: '50vh' }}
            rows={rows}
            columns={columns}
            editMode="row"
            processRowUpdate={handleProcessRowUpdate}
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
            slots={{
                toolbar: () => <EditToolbar handleAddRow={handleAddRow} />,
            }}
        />
    );
}

function EditToolbar({ handleAddRow }) {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<Add />} onClick={handleAddRow}>
                Add Record
            </Button>
        </GridToolbarContainer>
    );
}



export default Update