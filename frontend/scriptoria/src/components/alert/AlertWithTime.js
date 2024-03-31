import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AlertWithTime = (props) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        let timeout;
        if (open) {
            timeout = setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [open]);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Box sx={{
                width: '50%', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Collapse in={open}>
                    <Alert
                        severity={props.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {props.msg}
                    </Alert>
                </Collapse>
            </Box>
        </Box>
    );
}

export default AlertWithTime;