import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Checkbox, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState, useContext } from 'react';
import SearchContext from '../context/SearchContext';


const OrdersTable=()=> {

  const [searchResults, setSearchResults, allData, setAllData] = useContext(SearchContext);

  const [selected, setSelected] = useState([]);
  const handleChange = (event, id) => {
    if (event.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((el) => el !== id));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Orders Table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < searchResults.length
                }
                checked={false}
                inputProps={{ 'aria-label': 'Select all items' }}
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" underline="always">
                Order #
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" underline="always">
                Type
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" underline="always">
                Item
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" underline="always">
                Category
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" underline="always">
                Description
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '60px' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={false}
                  inputProps={{ 'aria-labelledby': `checkbox-${row.id}` }}
                />
              </TableCell>
              <TableCell>{row.orderNumber}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.item}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable;
