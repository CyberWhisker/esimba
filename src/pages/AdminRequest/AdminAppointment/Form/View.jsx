import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchRequirementByReserveId } from '../../../../api/requirementApi'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function View({ selected, onClose, handleGetData }) {
  const [data, setData] = useState([])
  useEffect(() => {
    const handleGetData = async () => {
      const { data, error } = await fetchRequirementByReserveId(selected._id)
      if (!error) {
        setData(data.data)
      }
    }
    handleGetData()
  }, [])

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Box sx={{ width: '100vh', p: 2 }}>
      <Stack spacing={1}>
        <Typography variant='h5' fontWeight={'bold'}>View Requirement</Typography>
        <Divider />
        <div>
          {data?.map((item, index) => (
            <>
              <Typography>{item.name}</Typography>
              <Document key={index} file={`/requirements/${item.file}`} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </>
          ))}
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </Stack>
    </Box>
  )
}

export default View