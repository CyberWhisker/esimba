import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function DeathLayout({ selected }) {
    return (
        <Box sx={{
            backgroundImage: 'url(/pdfImg/DeathImg.png)',
            backgroundSize: 'cover',
            height: '100vh'
        }}>
            <Stack sx={{
                pt: 25,
                px: 7
            }}>
                <Content selected={selected}/>
            </Stack>
        </Box>
    )
}

function Content({selected}) {
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
            <Grid2 container spacing={2} mt={2}>
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
                        a resident of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.birthAddress}</Typography>
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
                        married to
                    </Typography>
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
                        died on
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.birthAddress}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        at the of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.deathDate).format('DD - MMMM - YYYY')}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>(day - month - year)</Typography>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} mt={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        the cause of death was
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.causeOfDeath}</Typography>
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
                        was buried on
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{moment(selected?.burialDate).format('DD - MMMM - YYYY')}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>(day - month - year)</Typography>
                </Grid2>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        in one of the following cemeteries:
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} mt={2}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Roman Catholic Cemetery
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.romanCemetary}</Typography>
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
                        Municipal Cemetery of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.municipalCemetary}</Typography>
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
                        Private Cemetery of
                    </Typography>
                </Grid2>
                <Grid2 size='grow'>
                    <Typography>{selected?.privateCemetary}</Typography>
                    <Divider
                        sx={{
                            width: '100%',
                            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
                        }}
                    />
                </Grid2>
            </Grid2>

            <Typography my={2} textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                This is true copy of the original record as it appears in our Liber Defunctorum,
            </Typography>

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

            <Grid2 container spacing={2} mt={4}>
                <Grid2>
                    <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Date Issued:
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
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
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

export default DeathLayout