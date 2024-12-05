import React, { useEffect, useState } from 'react';
import MasterAdmin from '../../layouts/MasterAdmin';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CustomCard from '../../components/CustomCard';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { fetchChapelData } from '../../api/chapelApi';
import { fetchPriestByParishId } from '../../api/priestApi';

function PriestSchedule() {
    const [parish, setParish] = useState('')

    const handleGetPriest = async () => {
        if (parish) {
            const { data, error } = fetchPriestByParishId(parish)
            if (!error) {
                console.log(data)
            }
        }
    }

    useEffect(() => {
        handleGetPriest()
    }, [parish])

    return (
        <MasterAdmin>
            <Box display="flex" gap={2} height="100%">
                <Box flex={1}>
                    <DataTable parish={parish} setParish={setParish} />
                </Box>
                <Box flex={2}>
                    <Schedule />
                </Box>
            </Box>
        </MasterAdmin>
    );
}

function Schedule() {
    return (
        <Box>
            <CustomCard>
                <Box sx={{ p: 2 }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        timeZone="UTC"
                        initialView="dayGridMonth"
                        displayEventTime={false}
                    />
                </Box>
            </CustomCard>
        </Box>
    );
}

function DataTable({ setParish, parish }) {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };

    const handleAddRow = () => {
        const id = `${Math.random()}`;
        const newRow = { id, name: '', status: '' };
        setRows((oldRows) => [...oldRows, newRow]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const handleDeleteClick = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'headerStyle',
        },
        {
            field: 'actions',
            type: 'actions',
            headerClassName: 'headerStyle',
            headerName: 'Actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<Save />}
                            label="Save"
                            onClick={() =>
                                setRowModesModel((prev) => ({
                                    ...prev,
                                    [id]: { mode: GridRowModes.View },
                                }))
                            }
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<Cancel />}
                            label="Cancel"
                            onClick={() =>
                                setRowModesModel((prev) => ({
                                    ...prev,
                                    [id]: { mode: GridRowModes.View },
                                }))
                            }
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        onClick={() =>
                            setRowModesModel((prev) => ({
                                ...prev,
                                [id]: { mode: GridRowModes.Edit },
                            }))
                        }
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
        <CustomCard>
            <Box
                sx={{
                    '& .headerStyle': {
                        backgroundColor: theme.palette.warning.main,
                        color: theme.palette.getContrastText(theme.palette.warning.main),
                    },
                    height: '100%',
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={rows}
                    editMode="row"
                    processRowUpdate={handleProcessRowUpdate}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    slots={{
                        toolbar: () => <EditToolbar handleAddRow={handleAddRow} parish={parish} setParish={setParish} />,
                    }}
                />
            </Box>
        </CustomCard>
    );
}

function EditToolbar({ handleAddRow, setParish, parish }) {

    return (
        <GridToolbarContainer>
            <Stack spacing={4} direction={'row'} sx={{ width: '100%' }}>
                <Button color="primary" fullWidth startIcon={<Add />} onClick={handleAddRow}>
                    Add Record
                </Button>
                <SelectChurch setParish={setParish} parish={parish} />
            </Stack>
        </GridToolbarContainer>
    );
}

function SelectChurch({ setParish, parish }) {
    const [chapelData, setChapelData] = useState([])

    const handleGetChapel = async () => {
        const { data, error } = await fetchChapelData()
        if (!error) {
            setChapelData(data)
        }
    }

    const handleChange = (e) => {
        setParish(e.target.value)
    }

    useEffect(() => {
        handleGetChapel()
    }, [])
    return (
        <TextField select label="Select Parish" defaultValue={''} fullWidth onChange={handleChange}>
            {chapelData.map((item, index) =>
                <MenuItem key={index} value={item._id}>{item.chapel}</MenuItem>
            )}
        </TextField>
    )
}

export default PriestSchedule;
