import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Checkbox, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import SearchContext from '../context/SearchContext';


const OrdersTable=()=> {

  const {searchResults } = useContext(SearchContext);



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Orders Table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={false}
                inputProps={{ 'aria-label': 'Select all items' }}
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" >
                Order #
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" >
                Type
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                Item
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" >
                Category
              </Typography>
              <Typography variant="subtitle2" color="primary">
                show all
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" >
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
