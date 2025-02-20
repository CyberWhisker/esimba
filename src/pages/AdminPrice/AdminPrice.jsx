import React, { useEffect, useState } from 'react';
import { Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import CustomCard from '../../components/CustomCard';
import MasterAdmin from '../../layouts/MasterAdmin';
import { Edit, Save } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchPrice, storePrice } from '../../api/priceApi';

function AdminPrice() {
    return (
        <MasterAdmin>
            <Stack spacing={1}>
                <Stack spacing={1} direction={'row'}>
                    <Typography variant='h4' fontWeight={'bold'}>Price Maintenance</Typography>
                </Stack>
                <CustomCard>
                    <PriceList />
                </CustomCard>
            </Stack>
        </MasterAdmin>
    );
}

function PriceList() {
    const [editableItem, setEditableItem] = useState(null);
    const [prices, setPrices] = useState({
        marriage: [
            { id: 1, name: 'Certificate', price: '300' },
            { id: 2, name: 'Kasal Sa Loob ng Misa sa Regular Na Oras at Araw', price: '1200' },
            { id: 3, name: 'Kasal Sa Loob ng Misa Labas sa Regular Na Oras at Araw', price: '2000' },
            { id: 4, name: 'Kasal Sa Loob ng Misa Labas sa Kapilya sa Barangay', price: '15000' },
            { id: 5, name: 'Kasal sa Loob ng Misa sa Kapilya sa pagkatapos ng Piyesta', price: '1500' }
        ],
        baptismal: [{ id: 6, name: 'Certificate', price: '300' }],
        burial: [{ id: 7, name: 'Certificate', price: '300' }],
        confirmation: [{ id: 8, name: 'Certificate', price: '300' }]
    });

    const transformPrices = (data) => {
        const formattedData = data.reduce((acc, item, index) => {
            const { type, name, price } = item;

            // Ensure the type exists in the accumulator
            if (!acc[type]) {
                acc[type] = [];
            }

            // Push the formatted object
            acc[type].push({
                id: index + 1, // Assign incremental ID (or use item._id if needed)
                name,
                price: price?.toString() || '0' // Convert price to string, default to '0'
            });

            return acc;
        }, {});

        return formattedData;
    };

    const handleGetData = async () => {
        const { data, error } = await fetchPrice();
        if (error) {
            console.log(error)
            toast.error('Something went wrong');
        }
        if (data.length > 0) {
            const formattedPrices = transformPrices(data);
            setPrices(formattedPrices)
        }
    }

    // Handle edit button click
    const handleEdit = (category, id) => {
        setEditableItem({ category, id });
    };

    // Handle save button click
    const handleSave = async () => {
        const { data, error } = await storePrice(prices);
        if (error) {
            console.log(error)
            toast.error('Something went wrong');
        } else {
            toast.success('Price saved successfully!');
            setEditableItem(null);
        }

    };

    // Handle price change
    const handlePriceChange = (category, id, value) => {
        setPrices(prevPrices => ({
            ...prevPrices,
            [category]: prevPrices[category].map(item =>
                item.id === id ? { ...item, price: value } : item
            )
        }));
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Container sx={{ py: 2 }}>
            {Object.keys(prices).map(category => (
                <Stack px={10} key={category}>
                    <Typography fontWeight={'bold'} variant='h5'>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>
                    <Divider />
                    <ul>
                        {prices[category].map(item => (
                            <li key={item.id} style={{ listStyle: 'none', marginBottom: 10 }}>
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography alignContent={'center'}>{item.name}</Typography>
                                    <Stack direction={'row'} spacing={1}>
                                        <TextField
                                            label='Price'
                                            value={item.price}
                                            onChange={e => handlePriceChange(category, item.id, e.target.value)}
                                            disabled={!editableItem || editableItem.id !== item.id}
                                        />
                                        <IconButton
                                            aria-label={editableItem && editableItem.id === item.id ? 'save' : 'edit'}
                                            size='large'
                                            color={editableItem && editableItem.id === item.id ? 'success' : 'warning'}
                                            onClick={() =>
                                                editableItem && editableItem.id === item.id
                                                    ? handleSave()
                                                    : handleEdit(category, item.id)
                                            }
                                        >
                                            {editableItem && editableItem.id === item.id ? <Save fontSize='inherit' /> : <Edit fontSize='inherit' />}
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </li>
                        ))}
                    </ul>
                </Stack>
            ))}
        </Container>
    );
}

export default AdminPrice;
