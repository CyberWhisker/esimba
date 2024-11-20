import { Box, Divider, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'

function BaptismLayout() {
  return (
    <Box sx={{
      backgroundImage: 'url(/pdfImg/Background.png)',
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <Stack sx={{
        pt: 4,
        px: 7
      }}>
        <HeaderStyle />
        <Content />
      </Stack>
    </Box>
  )
}

function HeaderStyle() {
  return (
    <Stack>
      <img alt='Logo' src='/pdfImg/BaptismLogo.png' />
      <Typography fontWeight={'bold'} textAlign={'center'} fontStyle={'italic'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
        PARISH OF
      </Typography>
      <Box sx={{ px: '20vh' }}>
        <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
          Parish Name
        </Typography>
        <Divider
          sx={{
            width: '100%',
            borderBottom: '3px dotted rgba(0, 0, 0, 1)',
          }}
        />
      </Box>
    </Stack>
  )
}

function Content() {
  return (
    <Stack mt={2}>
      <Grid2 container spacing={2}>
        <Grid2>
          <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
            Parish Name
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
          <Typography>Full Name</Typography>
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
            and
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
            born in
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
            on
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
            baptized on
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
          <Divider
            sx={{
              width: '100%',
              borderBottom: '3px dotted rgba(0, 0, 0, 1)',
            }}
          />
        </Grid2>
      </Grid2>

      <Typography fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ my: 2, fontFamily: "'Times New Roman', Times, serif" }}>
        according to the Rite of the Roman Catholic Church
      </Typography>


      <Grid2 container spacing={2}>
        <Grid2>
          <Typography textAlign={'center'} variant='h6' sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
            by the Rev
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
            sponsors being
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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
            and
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
          <Divider
            sx={{
              width: '100%',
              borderBottom: '3px dotted rgba(0, 0, 0, 1)',
            }}
          />
        </Grid2>
      </Grid2>

      <Typography fontWeight={'bold'} textAlign={'center'} variant='h6' sx={{ my: 2, fontFamily: "'Times New Roman', Times, serif" }}>
        This true copy of the original records as it appears on our Liber Baptismorum,
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
          <Typography>33</Typography>
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
            Purpose:
          </Typography>
        </Grid2>
        <Grid2 size='grow'>
          <Typography>Full Name</Typography>
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

export default BaptismLayout