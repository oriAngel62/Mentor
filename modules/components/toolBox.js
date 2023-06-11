import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Backdrop, backdropClasses } from "@mui/material";
import { set } from "date-fns";
import MissionForm from "./missionForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function ToolBox({ data, setData }) {
    const [checked, setChecked] = React.useState([0]);
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };
    const handleOpen = (id) => {
        setOpen(id);
    };
    const handleClose = (event, reason) => {
        console.log(reason);
        setOpen("");
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
    const onDeadlineChange = (nextValue) => {};
    const onSelectChange = (nextValue) => {};

    const onSliderChange = (event, newValue) => {
        setInterval(newValue);
    };

    const onRankChange = (nextValue) => {};

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
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={handleToggle(appointment.id)}
                    />
                </ListItemIcon>
                <ListItemButton
                    role={undefined}
                    onClick={() => handleOpen(appointment.id)}
                    dense
                >
                    <ListItemText
                        primary={appointment.title}
                        secondary={"Secondary text"}
                    />
                </ListItemButton>
                <Modal
                    open={open ? open == appointment.id : false}
                    onClose={handleClose}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    // slots={{ backdrop: Backdrop }}
                    // slotProps={{
                    //     backdrop: {
                    //     sx: {
                    //         borderColor: 'rgba(255, 255, 255, 0)',
                    //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    //     },
                    //     },
                    // }}
                    aria-labelledby="modal-title"
                >
                    <MissionForm
                        appointment={appointment}
                        isSettled={appointment.settled}
                        updateAppointment={() => {}}
                        deleteAppointment={() => {}}
                    />
                </Modal>
            </ListItem>
        );
    });

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Tabs
                value={tab}
                onChange={handleTab}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs"
            >
                <Tab value={0} label="Unsettled" />
                <Tab value={1} label="Settled" />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <Grid item xs={12} md={6}>
                    <Demo>
                        <List>{listItems}</List>
                    </Demo>
                </Grid>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}
