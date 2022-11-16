import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Amplify, { Auth } from 'aws-amplify';
import awsMobile from '../../aws.export';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import logo from '../../image/152_logo.png';
import Image from 'next/image';

export async function getServerSideProps(context: { query: { userId: string; id: string } }) {
  const { userId, id } = context.query;
  if (context.query.userId === undefined || context.query.id !== 'id') {
    return {
      notFound: true,
    };
  }
  if (userId === '' || id !== 'id') {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
}

Amplify.configure({
  ...awsMobile,
  Analytics: {
    disabled: true,
  },
});

interface IFromInput {
  username: string;
  password: string;
  email: string;
  code: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: NextPage = () => {
  const router = useRouter();
  const { userId: id } = router.query;

  async function createUserAWS(data: IFromInput) {
    try {
      const { username, email } = data;
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/user/invite`,
        //`http://localhost:5000/api/user/invite`,
        { username, email },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function createConnection(data: IFromInput) {
    try {
      const {
        data: { _id },
      } = await createUserAWS(data);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/user-connection`,
        //`http://localhost:5000/api/user-connection`,
        { userId: _id, connectionId: id },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async function signUp(data: IFromInput) {
    try {
      const { username, password, email } = data;
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      await await createConnection(data);
    } catch (error) {
      throw error;
    }
  }

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [showCode, setShowCode] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFromInput>();

  async function confirmSignUp(data: IFromInput) {
    try {
      const { username, code } = data;
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
      throw error;
    }
  }

  const onSubmit: SubmitHandler<IFromInput> = async (data: any) => {
    try {
      if (showCode) {
        confirmSignUp(data);
        router.push('/success');
      } else {
        if (id) {
          await signUp(data);
          setShowCode(true);
        }
      }
    } catch (error) {
      setOpen(true);
      setErrorMessage(`${error}`);
      console.log('error confirming sign up', error);
    }
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '100%',
            flex: 1,
            maxWidth: '500px',
            margin: '0 auto',
            padding: '0em 1em',
          }}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Image src={logo.src} alt="Picture of the author" width={100} height={100} />
          </div>
          <h1 style={{ textAlign: 'center' }}>Create Account</h1>
          <p style={{ textAlign: 'center' }}>You've been invited to join the Mediashare private app trial. Please create a user account to continue.</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              sx={{ input: { color: '#000', backgroundColor: '#fff', borderRadius: '5px' } }}
              id="username"
              type="text"
              label="Username"
              variant="filled"
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : null}
              {...register('username', { required: { value: true, message: 'Please enter username' } })}
            />

            <TextField
              sx={{ input: { color: '#000', backgroundColor: '#fff', borderRadius: '5px' } }}
              id="password"
              type="password"
              label="Password"
              variant="filled"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              {...register('password', {
                required: { value: true, message: 'Please enter your password' },
                minLength: {
                  value: 8,
                  message: 'Please enter a strong password',
                },
              })}
            />

            <TextField
              sx={{ input: { color: '#000', backgroundColor: '#fff', borderRadius: '5px' } }}
              id="email"
              type="email"
              label="Email"
              variant="filled"
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              {...register('email', { required: { value: true, message: 'Please enter your email' } })}
            />

            {showCode && (
              <TextField
                sx={{ input: { color: '#000', backgroundColor: '#fff', borderRadius: '5px' } }}
                id="code"
                type="text"
                label="Verification code"
                variant="filled"
                error={errors.code ? true : false}
                helperText={errors.code ? errors.code.message : null}
                {...register('code', {
                  required: { value: true, message: 'Please enter code' },
                  minLength: {
                    value: 6,
                    message: 'Your verification is 6 character long.',
                  },
                })}
              />
            )}

            <Button variant="contained" type="submit" style={{ backgroundColor: '#15B7EB' }}>
              {showCode ? 'Confirm code' : 'Sign up'}
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
