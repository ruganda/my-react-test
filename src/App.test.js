import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import HomePage from './components/HomePage';
import SearchContext from './context/SearchContext';

describe('App', () => {
  it('renders the HomePage component', async () => {
    render(<App />);
    expect(screen.getByText('Item search')).toBeInTheDocument();
  });

  it('fetches and sets the dummy data', async () => {
    const dummyData = [{ id: 1, item: '12346759' }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyData),
      })
    );
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Order Central')).toBeInTheDocument();
  });
});


describe('HomePage', () => {

  it('renders the search component', () => {
    const initialValues = {searchResults: [], setSearchResults: ()=>{}, allData: [], setAllData: ()=>{}}
    render(
      <SearchContext.Provider value={initialValues}>
        <HomePage fetchDummyData={() => {}} />
      </SearchContext.Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the orders table if searchResults is not empty', () => {
    const initialValues = {searchResults: [{ id: 1, item: '126790' }], setSearchResults: ()=>{}, allData: [], setAllData: ()=>{}}

    render(
      <SearchContext.Provider value={initialValues}>
        <HomePage fetchDummyData={() => {}} />
      </SearchContext.Provider>
    );
    expect(screen.getByText('126790')).toBeInTheDocument();
  });

  it('renders the empty state if searchResults is empty', () => {
    const initialValues = {searchResults: [], setSearchResults: ()=>{}, allData: [], setAllData: ()=>{}}

    render(
      <SearchContext.Provider value={initialValues}>
        <HomePage fetchDummyData={() => {}} />
      </SearchContext.Provider>
    );
    expect(screen.getByText('What are you looking for?')).toBeInTheDocument();
  });
});