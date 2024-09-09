import { Box, Button, Card, Stack, styled, TextField, Typography } from '@mui/material'
import React from 'react'
import Master from '../../../layouts/Master'
import { ArrowBackRounded, CloudUpload } from '@mui/icons-material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function MarriageForm() {
  const navigate = useNavigate();
  return (
    <Master>
      <Stack sx={{py: 4}} spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button startIcon={<ArrowBackRounded/>} variant='contained' onClick={() => navigate(-1)}>Go Back</Button>
          <Typography variant='h4' fontWeight={'bold'}>Fill-out Form: Marriage</Typography>
        </Stack>
        <Card elevation={5} sx={{
          padding: 2,
          backgroundColor: 'rgba(128, 0, 0, 0.5)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: 'none', 
          transition: 'background-color 0.3s ease',
        }}>
          <FormSection/>
        </Card>
      </Stack>
    </Master>
  )
}

function FormSection () {
  const currentDay = moment();
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form>
        <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <TextField label="Groom's Name" sx={{width: '100%'}}/>
            <TextField label="Bride's Name" sx={{width: '100%'}}/>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <DatePicker label='Date of Marriage' sx={{width: '100%'}}/>
            <TimePicker label='Time of Marriage' sx={{width: '100%'}}/>
          </Stack>
          <Typography>1. Picture of Groom & Bride together - 4R (Submission must be one month before the date of Marriage)</Typography>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <Typography>2. Certificate of None Marriage (CENOMAR) - NSO</Typography>
          <Stack direction={'row'} spacing={2}>
            <Box>
              <Typography>Groom</Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </Box>
            <Box>
              <Typography>Bride</Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </Box>
          </Stack>
          <Typography>3. Latest copy of Baptismal Certificate fro marriage Purposes</Typography>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <Typography>4. Latest copy of Confirmation Certificate for Marriage Purposes</Typography>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <Typography>5. Latest copy of Birth Certificate</Typography>
          <Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </Box>
          <Button variant='contained'>Submit</Button>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

export default MarriageForm