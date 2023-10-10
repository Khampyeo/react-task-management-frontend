import React, { Component, useContext, useEffect, useMemo, useState } from 'react';
import { Grid, FormControl, Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import TasksContext from '../stores/task.store';
import { debounce } from 'lodash';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

function TasksFilters() {
  // Sử dụng useContext để truy cập Context
  const { tasks, filters, updateFilters } = useContext(TasksContext);

  const [status, setStatus] = useState(filters.status);
  const [search, setSearch] = useState(filters.search);


  const handleStatusFilterChange = (e) => {
    const newStatus = e.target.value;

    setStatus(newStatus);
    updateFilters({ status: newStatus, search });
  };

  const debouncedSearch = useMemo(() => {
    return debounce((newSearch) => {
      updateFilters({ status, search: newSearch });
    }, 1000);
  }, []);


  const handleSearchTermChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    debouncedSearch(newSearch)
  };

  return (
    <FiltersContainer>
      <Grid justifyContent={'space-between'} container>
        <Grid style={{ marginRight: '8px', marginBottom: '8px' }} item>
          <ControlContainer >
            <FormControl style={{ width: '220px' }}>
              <TextField
                placeholder="Search..."
                value={search}
                onChange={handleSearchTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </ControlContainer>
        </Grid>

        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: '220px' }}>
              <Select value={status} onChange={handleStatusFilterChange} displayEmpty>
                <MenuItem value="">No status filter</MenuItem>
                <MenuItem value={'OPEN'}>Open</MenuItem>
                <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                <MenuItem value={'DONE'}>Done</MenuItem>
              </Select>
            </FormControl>
          </ControlContainer>
        </Grid>
      </Grid>
    </FiltersContainer>
  );
}

export default TasksFilters;