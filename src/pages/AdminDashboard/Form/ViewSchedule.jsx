import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, Stack, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { fetchEventById } from '../../../api/eventApi';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { fetchReservedByEventId } from '../../../api/reservedApi';
import { AuthContext } from '../../../context/AuthContext';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.primary.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function ViewSchedule({ eventId, onClose }) {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate(); // Fix here: Use useNavigate to navigate between pages.
    const [eventData, setEventData] = useState({});
    const [slot, setSlot] = useState(0);
    const [remaining, setRemaining] = useState(0)
    const [reservedData, setReservedData] = useState({});
    const [filteredReserved, setFilteredReserved] = useState([]);
    const [formData, setFormData] = useState({
        parish: auth.user.parish._id
    });
    const [btnProceed, setBtnProceed] = useState(true);

    // Fix Date handling in handleDateChange
    const handleDateChange = (name, value) => {
        const filteredByDate = reservedData.filter((item) => moment(item.date).isSame(moment(value), 'day'));
        setFormData({
            ...formData,
            [name]: moment(value).toISOString() // Ensure to call toISOString() properly
        });
        setFilteredReserved(filteredByDate)
        setRemaining(slot - filteredByDate.length)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if formData is valid (for example, if a date is selected)
        if (!formData.date || !formData.slot) {
            toast.error('Please select a date and slot.');
            return;
        }

        // Navigate to the baptism form and pass the formData
        if (eventData.event_type == "Baptsim") {
            navigate('/user/baptismForm', { state: { formData } });
        }
        if (eventData.event_type == "Confirmation") {
            navigate('/user/confirmationForm', { state: { formData } });
        }
        if (eventData.event_type == "Burial") {
            navigate('/user/deathForm', { state: { formData } });
        }
        if (eventData.event_type == "Marriage") {
            navigate('/user/marriageForm', { state: { formData } });
        }
    };

    // Fetch event data using eventId
    const handleGetData = async () => {
        const { data, error } = await fetchEventById(eventId);
        if (!error) {
            setEventData(data);
            setSlot(data.slot)
            setFormData({
                ...formData,
                eventId: data._id // Add eventId to formData
            });
        }
    };

    const handleGetReserved = async () => {
        const { data, error } = await fetchReservedByEventId(eventId)
        if (!error) {
            setReservedData(data)
        }
    }

    useEffect(() => {
        handleGetData();
        handleGetReserved();
    }, [eventId]); // Run when eventId changes

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <form onSubmit={handleSubmit}>
                <Box sx={headerStyle}>
                    <Typography id="delete-modal-title" variant="h6" component="h2">
                        Schedule Picker
                    </Typography>
                </Box>
                <Stack sx={{ p: 2 }} spacing={1}>
                    <TextField label="Event Name" value={eventData.event || ''} disabled />
                    <DatePicker
                        label="Select Date"
                        minDate={moment(eventData.startDate)}
                        maxDate={moment(eventData.endDate)}
                        onChange={(value) => handleDateChange('date', value)}
                    />
                    <Typography>Slot:</Typography>
                    <ul>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            onChange={(e) => {
                                const slot = e.target.value;
                                setFormData({
                                    ...formData,
                                    slot
                                });
                                setBtnProceed(false); // Enable Proceed button when a slot is selected
                            }}
                        >
                            {filteredReserved.map((item, index) => (
                                <FormControlLabel value="1" control={<Radio />} key={index} label={`Reserved (${item.user.name})`} disabled />
                            ))}
                            {Array.from({ length: remaining }).map((_, index) => (
                                <FormControlLabel
                                    value={index + slot}
                                    control={<Radio />}
                                    key={index}
                                    label="Available"
                                />
                            ))}

                            {/* Add more FormControlLabel components for other slot options */}
                        </RadioGroup>
                    </ul>
                </Stack>
                <Divider />
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    {/* <Button variant="contained" color="success" type="submit" disabled={btnProceed}>
                        Proceed
                    </Button> */}
                </Box>
            </form>
        </LocalizationProvider>
    );
}

export default ViewSchedule