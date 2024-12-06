import React, { useEffect, useState } from 'react'
import MasterAdmin from '../../layouts/MasterAdmin'
import {
    Box, Grid2, Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
} from '@mui/material'
import { BarChart, PieChart } from '@mui/x-charts'
import CustomCard from '../../components/CustomCard'
import { fetchTransactions } from '../../api/transactionApi'
import dayjs from 'dayjs';
import { fetchRequest } from '../../api/requestApi'
import AppointmentReport from './AppointmentReport'

function AdminReport() {
    return (
        <MasterAdmin>
            <Stack spacing={1}>
                <Typography variant='h4' fontWeight={'bold'}>Reports</Typography>
                <CustomCard>
                    <Box sx={{ p: 2 }}>
                        <Typography>Transaction</Typography>
                        <TransactionReport />
                    </Box>
                </CustomCard>
                <Grid2 container spacing={2}>
                    <Grid2 size="grow">
                        <CustomCard>
                            <Box sx={{ p: 2 }}>
                                <Typography>Transaction Per Category</Typography>
                                <RequestReport />
                            </Box>
                        </CustomCard>
                    </Grid2>
                    <Grid2 size="grow">
                        <CustomCard>
                            <Box sx={{ p: 2 }}>
                                <Typography>Appoint Per Category</Typography>
                                <AppointmentReport />
                            </Box>
                        </CustomCard>
                    </Grid2>
                </Grid2>
            </Stack>
        </MasterAdmin>
    )
}

// Utility to group data by periods
const groupDataByPeriod = (transactions, period) => {
    const format = {
        monthly: "YYYY-MM",
        yearly: "YYYY",
        quarterly: "YYYY-[Q]Q",
    }[period];

    return transactions.reduce((acc, transaction) => {
        const key = dayjs(transaction.createdAt).format(format);
        acc[key] = (acc[key] || 0) + transaction.amount;
        return acc;
    }, {});
};

// Utility to group by item types
const groupDataByItemType = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        acc[transaction.item_type] = (acc[transaction.item_type] || 0) + 1;
        return acc;
    }, {});
};

function TransactionReport() {
    const [data, setData] = useState([])
    useEffect(() => {
        const handleGetTransaction = async () => {
            const { data, error } = await fetchTransactions()
            if (!error) {
                console.log(data)
                setData(data)
            }
        }
        handleGetTransaction()
    }, [])
    const [view, setView] = useState("monthly"); // Default view: Monthly
    const [reportType, setReportType] = useState("amount"); // Default: Total Funds

    // Process data based on filters
    const groupedData = reportType === "amount"
        ? groupDataByPeriod(data, view)
        : groupDataByItemType(data);

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Transaction Reports
            </Typography>

            {/* Filters */}
            <Grid2 container spacing={2} sx={{ mb: 3 }}>
                <Grid2 item xs={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>View By</InputLabel>
                        <Select
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                        >
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="quarterly">Quarterly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item xs={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <MenuItem value="amount">Total Funds</MenuItem>
                            <MenuItem value="itemType">Requests by Item Type</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
            </Grid2>

            {/* Chart */}
            <Typography variant="h6" gutterBottom>
                {reportType === "amount"
                    ? `Total Funds (${view.charAt(0).toUpperCase() + view.slice(1)})`
                    : "Total Requests by Item Type"}
            </Typography>
            <BarChart
                series={[{ data: values }]}
                height={350}
                xAxis={[{ data: labels, scaleType: 'band' }]}
                margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
            />
        </Box>
    );
}

const groupRequests = (requests, field) => {
    return requests.reduce((acc, request) => {
        const key = request[field];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
};

function RequestReport() {
    const [data, setData] = useState([]);
    const [groupBy, setGroupBy] = useState("certificate"); // Default: Group by certificate type

    useEffect(() => {
        const handleFetchRequests = async () => {
            const { data, error } = await fetchRequest();
            if (!error) {
                setData(data);
            }
        };
        handleFetchRequests();
    }, []);

    // Group the requests dynamically based on the selected field
    const groupedData = groupRequests(data, groupBy);

    // Convert grouped data into a format suitable for the PieChart
    const chartData = Object.entries(groupedData).map(([key, value], id) => ({
        id,
        value,
        label: key,
    }));

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h4" gutterBottom>
                Request Reports
            </Typography>

            {/* Filter to change the grouping field */}
            <FormControl fullWidth >
                <InputLabel>Group By</InputLabel>
                <Select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                >
                    <MenuItem value="certificate">Certificate Type</MenuItem>
                    <MenuItem value="status">Request Status</MenuItem>
                </Select>
            </FormControl>

            {/* Chart */}
            <Typography variant="h6" gutterBottom>
                {groupBy === "certificate"
                    ? "Requests by Certificate Type"
                    : "Requests by Status"}
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



export default AdminReport