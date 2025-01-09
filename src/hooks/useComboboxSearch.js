import React, { useState } from 'react';

export const useComboboxSearch = (items) => {
  const [query, setQuery] = useState('');

  const filteredItems =
    query === '' ? items : items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return {
    query,
    setQuery,
    filteredItems,
  };
};
