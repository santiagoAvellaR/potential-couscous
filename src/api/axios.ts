import axios from 'axios';
import type { MailApi, PasswordApi } from '../types/api.js';
import env from '../env.js';

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emailBranches = async (email: string): Promise<MailApi> => {
  try {
    const { data } = await api.post('/api/breaches', { email });
    return data as MailApi;
  } catch (err: unknown) {
    const e = err as Error;
    console.error(e.message);
    return null;
  }
}

export const passwords = async (password: string): Promise<PasswordApi> => {
  try {
    const { data } = await api.post('/api/password', { password });
    return data as PasswordApi;
  } catch (err: unknown) {
    const e = err as Error;
    console.error(e.message);
    return null;
  }
}
