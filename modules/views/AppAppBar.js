import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState, setAuthState } from "/modules/model/auth";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(setAuthState(""));
  };
  const links = auth ? (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/dd"
        sx={rightLink}
      >
        {'Schedule'}
      </Link>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/"
        sx={rightLink}
        onClick={signOut}
      >
        {'Sign Out'}
      </Link>
    </Box>
  ) : (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/in/sign-in/"
        sx={rightLink}
      >
        {'Sign In'}
      </Link>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/in/sign-up/"
        sx={{ ...rightLink }}
      >
        {'Sign Up'}
      </Link>
    </Box>
  );
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'mentor'}
          </Link>
          {links}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
