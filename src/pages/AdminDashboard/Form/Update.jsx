import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { deleteSchedule, updateSchedule } from '../../../api/scheduleApi';
import { toast } from 'react-toastify';

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

function Update({ selected, onClose, handleGetData }) {
    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Time Schedule List:
                </Typography>
            </Box>
            <Box id="delete-modal-description">
                <Box sx={{ p: 2 }}>
                    <DataTable selected={selected} handleGetData={handleGetData}/>
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
        const {data, error} = await updateSchedule(formData)
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
        const {data, error} = await deleteSchedule(formData)
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
        sx={{height: '50vh'}}
            rows={rows}
            columns={columns}
            editMode="row"
            processRowUpdate={(updatedRow, originalRow) => handleProcessRowUpdate(updatedRow)}
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
        />
    );
}

export default Update