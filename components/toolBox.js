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

export default function ToolBox({ appointments }) {

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

    const listItems = appointments.map((appointment, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
            <ListItem
                    key={appointment}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                    >
                    <ListItemIcon>
                        <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(index)}
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
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 200 }}>
                        <h2 id="child-modal-title">Text in a child modal</h2>
                        <p id="child-modal-description">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <Button onClick={handleClose}>Close Child Modal</Button>
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