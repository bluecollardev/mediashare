import {  createAsyncThunk } from '@reduxjs/toolkit';
import { makeActions } from 'mediashare/store/factory';
import { ApiService } from 'mediashare/store/apis';

const userConnectionNamesActionNames = ['user_send_mail'] as const;
export const userConnectionActions = makeActions(userConnectionNamesActionNames);

export const sendEmail = createAsyncThunk(userConnectionActions.userSendMail.type, async ({ userId, email }: { userId: string; email: string }, { extra }) => {
  const { api } = extra as { api: ApiService };
const result  = await api.userConnection.userConnectionControllerSendEmail({userId, email}).toPromise();
  return result;
});

// Don't need reducer