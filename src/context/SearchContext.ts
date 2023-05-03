import React from 'react';
import { OrderInterface } from '../types'

const SearchContext = React.createContext<{
  searchResults: OrderInterface[]
   setSearchResults: React.Dispatch<React.SetStateAction<OrderInterface[]>>
    allData: OrderInterface[]
     setAllData: React.Dispatch<React.SetStateAction<OrderInterface[]>>
}>({searchResults: [], setSearchResults: ()=>{}, allData: [], setAllData: ()=>{},});



export default SearchContext;
