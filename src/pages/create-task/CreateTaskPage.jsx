import React, { useContext, useState } from 'react';
import { TextField, FormControl, Button, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import ErrorMessage from '../../components/ErrorMessage';
import TasksContext from '../../stores/task.store';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  position: relative;
  max-width: 380px;
  width: 100%;
  background-color: white;
  padding: 60px 8%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const CustomIconButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
`;

export default function CreateTaskPage() {
  const navigate = useNavigate()
  const { createTask } = useContext(TasksContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmitTask = async () => {
    try {
      await createTask(title, description);
      navigate('/tasks');
    } catch (error) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
        <CustomIconButton onClick={() => navigate('/tasks')}><CloseIcon></CloseIcon></CustomIconButton>

      </FormContainer>
    </FormWrapper>
  );
}
