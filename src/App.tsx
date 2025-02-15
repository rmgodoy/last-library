import { createTheme, Drawer, ThemeProvider, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TableContainer, TableBody, TableCell, TableRow, Table } from '@mui/material'
import SearchAppBar from './components/AppBar';
import './App.css'
import { ThemeOptions } from '@mui/material/styles';
import { useState } from 'react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import DeedCard from './features/Deeds/components/DeedCard';
import { DeedType } from './features/Deeds/components/DeedCard/deedTypeEnum';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3b3b3b',
    },
    secondary: {
      main: '#C93131',
      light: '#F15249',
    },
    background: {
      default: '#918B70',
      paper: '#DDDAC0',
    },
  },
};

const theme = createTheme(themeOptions)

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState<'deeds' | 'effects'>('deeds');

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleSidebar}>
      <List>
        {['Deeds', 'Effects'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => setContent(text.toLowerCase() as 'deeds' | 'effects')}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AutoAwesomeIcon /> : <ElectricBoltOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme} >
      <SearchAppBar onToggleSidebar={toggleSidebar}></SearchAppBar>
      <Drawer sx={{ 'alignItems': 'flex-start', justifyContent: 'flex-start' }} open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        {DrawerList}
      </Drawer>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <DeedCard name='Cleave' type={DeedType.light} description={''} targetAndRange={'MELEE ATTACK VS. GUARD | 2 CREATURES'} base={''} hit={'Deal 2 Weapon Die Damage'} spark={'Confer weapon effect'} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* {content == 'deeds' ? <DeedCard name='Deed Title' /> : <>Effects</>} */}
      </TableContainer>
    </ThemeProvider>
  )
}

export default App
