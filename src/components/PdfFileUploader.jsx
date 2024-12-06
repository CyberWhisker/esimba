import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Stack, Grid, Alert, Input } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


const PdfFileUploader = () => {
    const [userId, setUserId] = useState('');
    const [files, setFiles] = useState({
        baptism: null,
        cenomar: null,
        marriage: null,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event, fieldName) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [fieldName]: event.target.files[0],
        }));
    };

    const handleSubmit = async () => {
        if (!userId) {
            setError('User ID is required.');
            return;
        }
        setError('');
        setMessage('');

        const formData = new FormData();
        formData.append('userId', userId);
        if (files.baptism) formData.append('baptism', files.baptism);
        if (files.cenomar) formData.append('cenomar', files.cenomar);
        if (files.marriage) formData.append('marriage', files.marriage);

        try {
            const response = await axios.post('http://localhost:4000/api/requirement/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message || 'Requirements uploaded successfully!');
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to upload requirements.');
        }
    };

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Upload Requirements
            </Typography>
            <Stack spacing={3}>
                <TextField
                    label="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography>Baptism Certificate</Typography>
                        <label htmlFor="baptism-upload">
                            <Input
                                accept="application/pdf"
                                id="baptism-upload"
                                type="file"
                                onChange={(e) => handleFileChange(e, 'baptism')}
                            />
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        {files.baptism && <Typography variant="body2">{files.baptism.name}</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>CENOMAR</Typography>
                        <label htmlFor="cenomar-upload">
                            <Input
                                accept="application/pdf"
                                id="cenomar-upload"
                                type="file"
                                onChange={(e) => handleFileChange(e, 'cenomar')}
                            />
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        {files.cenomar && <Typography variant="body2">{files.cenomar.name}</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>Marriage Certificate</Typography>
                        <label htmlFor="marriage-upload">
                            <Input
                                accept="application/pdf"
                                id="marriage-upload"
                                type="file"
                                onChange={(e) => handleFileChange(e, 'marriage')}
                            />
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                        {files.marriage && <Typography variant="body2">{files.marriage.name}</Typography>}
                    </Grid>
                </Grid>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <Button variant="contained" onClick={handleSubmit}>
                    Upload Requirements
                </Button>
            </Stack>

            <div>
                <Document file="/get.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </Box>
    );
};

export default PdfFileUploader;
