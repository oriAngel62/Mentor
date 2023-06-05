import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Backdrop, backdropClasses } from '@mui/material';
import { set } from 'date-fns';
import MissionForm from './missionForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function ToolBox({ data, setData }) {
    const [checked, setChecked] = React.useState([0]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const [interval, setInterval] = useState([20, 37]);
    const [dayName, setDayName] = useState([]);

    const onDescriptionChange = (nextValue) => {
    appointmentData.description = nextValue;
    };
    const onDeadlineChange = (nextValue) => {
    };
    const onSelectChange = (nextValue) => {
    };

    const onSliderChange = (event, newValue) => {
        setInterval(newValue);
    };

    const onRankChange = (nextValue) => {
    };

    const listItems = data.map((appointment, index) => {
        const labelId = `checkbox-list-label-${appointment.id}`;
        return (
            <ListItem
                    key={appointment.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                    >
                    <ListItemIcon>
                        <Checkbox
                        edge="start"
                        checked={checked.indexOf(appointment.id) !== -1}
                        tabIndex={appointment.id}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(appointment.id)}
                        />
                    </ListItemIcon>
                    <ListItemButton role={undefined} onClick={handleOpen} dense>
                        <ListItemText
                            primary={appointment.title}
                            secondary={'Secondary text'}
                        />
                    </ListItemButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                            sx: {
                                borderColor: 'rgba(255, 255, 255, 0)',
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            },
                            },
                        }}
                        aria-labelledby="modal-title"
                    >
                        <Box sx={{ ...style}}>
                                <b id="modal-title">Mission Details</b>
                                <MissionForm appointmentData={data} interval={interval} day={[dayName, setDayName]} onDeadlineChange={onDeadlineChange}
                                onSliderChange={onSliderChange} onDescriptionChange={onDescriptionChange} onRankChange={onRankChange}
                                onSelectChange={onSelectChange} isAssigned={false}
                                />
                                <Button onClick={handleClose}>Close Modal</Button>
                        </Box>
                    </Modal>
        </ListItem>
        );
    });
  
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Unassigned Appointments
                </Typography>
                <Demo>
                    <List>
                        {listItems}
                    </List>
                </Demo>
            </Grid>
        </Box>
    );
  }