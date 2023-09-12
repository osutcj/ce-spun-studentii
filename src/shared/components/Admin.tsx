import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container, Grid, Box, Avatar } from '@mui/material';
import './styles/admin.css';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CurrentGame from './adminTabs/CurrentGame';
import Questions from './adminTabs/Questions/Questions';
import AddAnswers from './adminTabs/Answers/AddAnswers';
import Teams from './adminTabs/Teams/TeamsTab';
import FlashRoundAdmin from './adminTabs/FlashRound/FlashRoundAdmin';
import GamesManagement from './adminTabs/Games/GamesManagement';
import { currEnvironment, firestore } from '../../utils/firebase/firebase';
import { auth} from '../../utils/firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentTab, changeCurrentTab] = useState(0);

  useEffect(() => {
    if (currEnvironment == 'localhost') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth,provider).then((result) => {
      const user = result.user;
      const whiteListRef = collection(firestore, 'whitelistedUsers');
      const emailQuery = query(whiteListRef, where('email', 'array-contains', user?.email));

      getDocs(emailQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setLoggedIn(true);
          } else {
            alert(
              "Nu ai acces la aceasta aplicatie! Pentru mai multe detalii contacteaza OSUT | Serviciul IT sau OSUT | Serviciul Divertisment !"
            );
          }
        })
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    changeCurrentTab(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  if (loggedIn) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            style={{ backgroundColor: 'white' }}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Joc curent" id={'1'} />
            <Tab label="Adaugare intrebari" id={'2'} />
            <Tab label="Adaugare raspunsuri" id={'3'} />
            <Tab label="Modifica echipe" id={'4'} />
            <Tab label="Runda fulger" id={'5'} />
            <Tab label="Manageriere jocuri" id={'6'} />
          </Tabs>
        </Box>
        <TabPanel value={currentTab} index={0}>
          <CurrentGame />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Questions />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <AddAnswers />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <Teams />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <FlashRoundAdmin />
        </TabPanel>
        <TabPanel value={currentTab} index={5}>
          <GamesManagement />
        </TabPanel>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 5,
        }}
      >
        <Avatar alt="OSUT" sx={{ width: 48, height: 48 }}/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              fullWidth
              className="login-button"
              variant="contained"
              onClick={handleLogin}
              sx = {{marginTop: 5}}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Admin;
