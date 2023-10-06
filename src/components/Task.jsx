import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import TasksContext from '../stores/task.store';


const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

export default function Task(props) {
  const tasksStore = useContext(TasksContext)
  const colorSelectItem = {
    OPEN: '#1976d2',
    IN_PROGRESS: '#ddbc00',
    DONE: '#208b59'
  }
  const { title, description } = props

  const deleteTask = () => {
    tasksStore.deleteTask(props.id);

  };

  const handleStatusChange = e => {
    tasksStore.updateTaskStatus(props.id, e.target.value);
  };

  return (
    <CardContainer>
      <Card >
        <CardContent>
          <CardTitle>{title}</CardTitle>
          {description}
        </CardContent>
        <CardActions style={{ padding: '14px' }} disableSpacing>
          <Grid
            alignItems={'center'}
            justifyContent="space-between" // Add it here :)
            container
          >
            <Grid item>
              <FormControl style={{ width: '140px' }}>
                <Select
                  style={{ color: `${colorSelectItem[props.status]}`, fontWeight: '600' }}
                  value={props.status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value={'OPEN'}>Open</MenuItem>
                  <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <IconButton onClick={deleteTask}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </CardContainer>
  );
}
