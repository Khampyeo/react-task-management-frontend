import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

import './SignInPage.scss';
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

function SignInPage(props) {
  const navigate = useNavigate();
  const { signin } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const submit = async () => {
    setErrorMessage(null);

    try {
      await signin(username, password);
      navigate('/tasks')
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  };

  const goToSignUp = () => {
    navigate('/signup')
  };

  return (
    <div className="fullscreen-wrapper">
      <FormContainer>
        <Heading>LOGIN</Heading>
        <p>Fill in your username and password to sign in.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormField
          id="outlined-username"
          label="Username"
          margin="dense"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormField
          id="outlined-password"
          label="Password"
          margin="dense"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr />
        <Button
          style={{ marginBottom: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={submit}
        >
          SIGN IN
        </Button>
        <Button fullWidth onClick={goToSignUp}>
          Don't have an account? Sign up now!
        </Button>
      </FormContainer>
    </div>
  );
}

export default SignInPage;