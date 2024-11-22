import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function MarriageLayout({ selected }) {
    return (
        <Box sx={{
            backgroundImage: 'url(/pdfImg/MarriageImg.png)',
            backgroundSize: 'cover',
            height: '100vh'
        }}>
            <Stack sx={{
                pt: 25,
                px: 7
            }}>
                <Content selected={selected} />
            </Stack>
        </Box>
    )
}

function Content({ selected }) {
    return (
        <Stack mt={2}>

            <Typography fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ my: 2, fontFamily: "'Times New Roman', Times, serif" }}>
                By these presents, the undersigned certifies that.
            </Typography>

            <Grid2 container spacing={2} mt={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Name:
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
                <Grid2>
                    <Typography>and</Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.partnerName}</Typography>
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
                        Age:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.age}</Typography>
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
                        Status:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>Married</Typography>
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
                        Father:
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
                        Mother:
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
            </Grid2>

            <Typography mt={2} fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Were united in Holy Matrimony
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        By:
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

            <Typography mt={2} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                According to the Rites of the roman Catholic Church and in the Law of the Country
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        On:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.marriageDate).format("DD - MMMM - YYYY")}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Typography mt={2} fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Being witness of the Ceremony
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size='grow'>
                    <Typography>{selected?.witness1}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Typography>and</Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.witness2}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} mt={4}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Certified true copy:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>Certified</Typography>
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
                        Date:
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.createdAt).format("DD - MMMM - YYYY")}</Typography>
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

export default MarriageLayout