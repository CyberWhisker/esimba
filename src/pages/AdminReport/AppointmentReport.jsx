import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import { fetchReserved } from "../../api/reservedApi";

// Utility to group appointments by a field
const groupAppointments = (appointments, field) => {
    return appointments.reduce((acc, appointment) => {
        const key = appointment[field];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
};

function AppointmentReport() {
    const [data, setData] = useState([]);
    const [groupBy, setGroupBy] = useState("status"); // Default: Group by status

    useEffect(() => {
        const handleFetchAppointments = async () => {
            const { data, error } = await fetchReserved();
            if (!error) {
                setData(data);
            }
        };
        handleFetchAppointments();
    }, []);

    // Group the appointments dynamically based on the selected field
    const groupedData = groupAppointments(data, groupBy);

    // Convert grouped data into a format suitable for the PieChart
    const chartData = Object.entries(groupedData).map(([key, value], id) => ({
        id,
        value,
        label: key,
    }));

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" gutterBottom>
                Appointment Reports
            </Typography>

            {/* Filter to change the grouping field */}
            <FormControl fullWidth>
                <InputLabel>Group By</InputLabel>
                <Select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                >
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="event">Event</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                </Select>
            </FormControl>

            {/* Chart */}
            <Typography variant="h6" gutterBottom>
                {groupBy === "status"
                    ? "Appointments by Status"
                    : groupBy === "event"
                        ? "Appointments by Event"
                        : "Appointments by Date"}
            </Typography>
            <Box sx={{ display: 'center' }}>
                <PieChart
                    series={[{ data: chartData }]}
                    width={300}
                    height={300}

                    slotProps={{
                        legend: {
                            labelStyle: {
                                tableLayout: 'fixed',
                            },
                            direction: 'row',
                            position: {
                                horizontal: 'middle',
                                vertical: 'bottom',
                            },
                        },
                    }}
                />

            </Box>
        </Box>
    );
}

export default AppointmentReport;
