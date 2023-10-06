import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

import './SignUpPage.scss';
import ErrorMessage from '../../components/ErrorMessage';
import { UserContext } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 380px;
  width: 100%;
  background-color: #edf4ff;
  padding: 60px 8%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

export default function SignUpPage() {
  const navigate = useNavigate()

  const userStore = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async () => {
    try {
      await userStore.signup(username, password);
      navigate('/signin');
    } catch (error) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  };

  const goToSignIn = (e) => {

    navigate('/signin')
  };
  return (
    <div className='fullscreen-wrapper'>
      <FormContainer>
        <Heading>Join us!</Heading>
        <p>Start managing tasks easily.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormField
          label="Username"
          margin="dense"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormField
          label="Password"
          margin="dense"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case letter, and one number OR special character.
        </p>
        <hr />
        <div>
          <Button
            style={{ marginBottom: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            SIGN UP
          </Button>
          <Button fullWidth onClick={goToSignIn}>
            Already have an account? Sign in now!
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}
