import { useState, useContext } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Box,
  Toolbar,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchContext from '../context/SearchContext';

const headerSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px',
};
const resetButtonSx = {
  cursor: 'pointer',
  color: 'blue',
};
const footerSx = {
  display: 'flex',
  marginTop: '16px',
  background: '#E7EDF6',
  backgroundColor: '#E7EDF6',
  width: '376px',
  position: 'fixed',
  top: '92%',
  left: 0,
  justifyContent: 'space-around',
  Padding: '10px',
};

const cancelButtonSx = {
  marginRight: '16px',
};

const Filters = ({
  open,
  setOpen,
  filters,
  setFilters,
  applyFilters,
  itemNumber,
  setItemNumber,
  orderNumber,
  setOrderNumber,
}) => {
  const [searchResults, setSearchResults] = useContext(SearchContext);

  const [expanded, setExpanded] = useState(['item', 'order', 'type']);

  const initialFilters = {
    item: [],
    order: [],
    type: [],
    apply: false,
  };

  const typeOptions = ['EDF', 'CAO', 'SFO'];

  const handleAccordionChange = (panel) => {
    setExpanded((prev) => {
      if (prev.includes(panel)) {
        return prev.filter((item) => item !== panel);
      } else {
        return [...prev, panel];
      }
    });
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;

    setFilters((prev) => {
      if (checked) {
        return { ...prev, type: typeOptions };
      } else {
        return { ...prev, type: [] };
      }
    });
  };

  const handleCheckboxChange = (event, filterItem) => {
    const { checked } = event.target;
    setFilters((prev) => {
      if (checked) {
        return { ...prev, type: [...prev.type, filterItem] };
      } else {
        return {
          ...prev,
          type: prev.type.filter((item) => item !== filterItem),
        };
      }
    });
  };

  const handleResetAll = () => {
    setFilters(initialFilters);
    setSearchResults([]);
    setItemNumber('')
    setOrderNumber('')
    setOpen(false);
  };

  const handleApply = () => {
    const currentFilters = {
      item: itemNumber.split(','),
      order: orderNumber.split(','),
      type: filters.type,
      apply: true,
    };
    const results = applyFilters(currentFilters);
    setSearchResults(results);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '85%',
          transform: 'translate(-50%, -50%)',
          width: '35%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          height: '100VH',
          p: 3,
          pt: 4,
        }}
      >
        <Toolbar sx={headerSx}>
          <div>
            <Typography variant="h6" sx={{ marginBottom: 0, fontWeight: 700 }}>
              Set Parameters
            </Typography>
            <Typography variant="caption" color="text.secondary">
              9 Parameters available
            </Typography>
          </div>
          <Typography
            variant="subtitle1"
            sx={resetButtonSx}
            onClick={handleResetAll}
          >
            Reset all
          </Typography>
        </Toolbar>
        <Accordion
          expanded={expanded.includes('item')}
          onChange={() => handleAccordionChange('item')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="item-content"
            id="item-header"
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Item #
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              placeholder="Enter item numbers"
              value={itemNumber}
              onChange={(e) => setItemNumber(e.target.value)}
              multiline
              minRows={2}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('order')}
          onChange={() => handleAccordionChange('order')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="order-content"
            id="order-header"
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Order
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              placeholder="Enter order numbers"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              multiline
              minRows={2}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('type')}
          onChange={() => handleAccordionChange('type')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="type-content"
            id="type-header"
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={typeOptions.every((option) =>
                    filters.type.includes(option)
                  )}
                />
                <ListItemText primary="Select all" />
              </ListItem>
              {typeOptions.map((filter, index) => (
                <ListItem key={index}>
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e, filter)}
                    checked={filters.type.includes(filter)}
                  />
                  <ListItemText primary={filter} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ ...footerSx }} styles={footerSx}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={cancelButtonSx}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Filters;
