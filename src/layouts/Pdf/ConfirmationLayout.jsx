import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function ConfirmationLayout({ selected }) {
    return (
        <Box sx={{
            backgroundImage: 'url(/pdfImg/ConfirmationImg.png)',
            backgroundSize: 'cover',
            height: '100vh'
        }}>
            <Stack sx={{
                pt: 15,
                px: 7
            }}>
                <Content selected={selected} />
            </Stack>
        </Box>
    )
}

function Content({ selected }) {
    return (
        <Stack>

            <Typography fontWeight={'bold'} textAlign={'center'} fontStyle={'italic'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                PARISH OF
            </Typography>
            <Box sx={{ px: '20vh' }}>
                <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    {selected?.chapel?.chapel}
                </Typography>
                <Divider
                    sx={{
                        width: '100%',
                        borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                    }}
                />
            </Box>

            <Grid2 container spacing={2} mt={20}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        This certifies that
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.name}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        child of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.motherName}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        and
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.fatherName}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Baptized on
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.baptismDate).format('DD - MMMM - YYYY')}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        , in the church of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.chapel?.chapel}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Typography mt={4} textAlign={'center'} fontWeight={'bold'} variant='h4' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                The Holy Scrament of Confirmation
            </Typography>

            <Grid2 container spacing={2} mt={4}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        On
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.chapel?.chapel}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        , by
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.priest}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Typography mt={4} fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                This is a true copy of the Original Record as it appears in our Book Confirmation,
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Date:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.createdAt).format('DD - MMMM - YYYY')}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>


            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Book No.
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>2</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Page No.
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>21</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Line No.
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>33</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Stack>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {selected?.priest}
                    </Typography>
                    <Divider
                        sx={{
                            width: '20vh',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                    <Typography fontWeight={'bold'} fontStyle={'italic'} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Parish Priest
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}

export default ConfirmationLayout