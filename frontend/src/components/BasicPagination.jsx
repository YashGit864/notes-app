import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function BasicPagination({ offset, limit, totalCount, setOffset, setLimit }) {
  const pageCount = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (event, value) => {
    setOffset((value - 1) * limit);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
  }

  return (
    <Stack spacing={2}>
      <FormControl variant="outlined" size="small" style={{ width: 120 }}>
        <InputLabel id="limit-select-label">Notes/Page</InputLabel>
        <Select
          labelId="limit-select-label"
          id="limit-select"
          value={limit}
          onChange={handleLimitChange}
          label="Notes/Page"
          variant='outlined'
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  );
}
