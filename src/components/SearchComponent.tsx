import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, InputBase, IconButton } from '@mui/material';
import SearchContext from '../context/SearchContext';
import debounce from 'lodash.debounce';
import Filters from './Filters';

import {
  Add as AddIcon,
  Bookmark as BookmarkIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const SearchNavContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const SearchInput = styled(InputBase)({
  borderRadius: '4px',
  backgroundColor: '#f1f3f4',
  padding: '0 8px',
  width: '250px',
});
interface FilterOptions {
  item: string[];
  order: string[];
  type: string[];
  apply: boolean;
}

const SearchNav = () => {
  const initialFilters = {
    item: [],
    order: [],
    type: [],
    apply: false,
  };

  const { searchResults, setSearchResults, allData } =
    useContext(SearchContext);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const [searchTerm, setSearchTerm] = useState('');
  const [itemNumber, setItemNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const search = (terms: string) => {
    const searchTerms = terms.split(',').map((term) => term.trim());
    const results = allData.filter((order) =>
      searchTerms.some(
        (term) => term && order.item.toString().includes(term.toString())
      )
    );
    setSearchResults(results);
  };

  const debouncedSearch = debounce(search, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return debouncedSearch.cancel;
  }, [searchTerm]);

  const applyFilters = (filters: FilterOptions) => {
    if (!filters.apply) {
      if (searchTerm) {
        return searchResults;
      }
      return allData;
    }

    const filteredData = allData.filter((item) => {
      const itemText = item.item.toString();
      const orderText = item.orderNumber.toString();

      return (
        filters.item.some(
          (term: string | number) =>
          itemText.includes(term.toString().trim())
        ) &&
        filters.order.some((term: string | number) =>
         orderText.includes(term.toString().trim())
        )
      );
    });

    if (filters.type.length > 0) {
      return filteredData.filter((item) => filters.type.includes(item.type));
    }

    return filteredData;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchResultsCount = searchResults.length;
  return (
    <SearchNavContainer>
      <div>
        <Typography
          variant="h6"
          sx={{ marginBottom: 0, color: 'black', fontWeight: 700 }}
        >
          Item search
        </Typography>
        <Typography variant="caption" color="black">
          {`${searchResultsCount} ${
            searchResultsCount === 1 ? 'item' : 'items'
          }`}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
          marginRight: '10%',
        }}
      >
        <SearchInput
          placeholder="Search by item #, order #"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AddIcon />
        </IconButton>
        <IconButton size="small">
          <BookmarkIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        {open && (
          <Filters
            open={open}
            setOpen={setOpen}
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            itemNumber={itemNumber}
            setItemNumber={setItemNumber}
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
          />
        )}
      </div>
    </SearchNavContainer>
  );
};

export default SearchNav;
