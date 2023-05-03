import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Drawer, Avatar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import EmptyState from './EmptyState';
import SearchContext from '../context/SearchContext';
import OrdersTable from './OrdersTable'
import SearchComponent from './SearchComponent';


const drawerWidth = 240;
interface HomeProps{
  fetchDummyData: ()=> void
}

export default function HomePage({ fetchDummyData }: HomeProps) {
  const {searchResults, setSearchResults, allData } = useContext(SearchContext);

  const fetchData = ()=>{
    fetchDummyData()
    setSearchResults(allData)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'unset' }}
      >
        <Toolbar>
          <SearchComponent/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <Toolbar>
        <Box display='flex' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Avatar sx={{bgcolor: '#0C67A0'}} >OC</Avatar>
          <Typography component={'h3'} ml='2' sx={{fontWeight: 'bolder', ml: '10px' }}> Order Central</Typography>
        </Box>

        </Toolbar>
        <Divider />
        <List>
          {['Item Search', 'Item', 'Item', 'Item', 'Item', 'Item', 'Item'].map(
            (text, index) => (
              <ListItem key={index} disablePadding sx={{bgcolor: index? 'unset': '#0C67A0', color: index? 'unset': '#e7ebf0'}}>
                <ListItemButton>
                  <ListItemIcon>
                    <StackedBarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Box>
          {searchResults.length === 0 ? <EmptyState fetchData={fetchData}/> : <OrdersTable/> }
        </Box>
      </Box>
    </Box>
  );
}
