import axios from 'axios';
import config from '../env.js';
import zxcvbn from 'zxcvbn';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emailBranches = async (email: string) => {
  const { data } = await api.get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      { headers: { 'hibp-api-key': config.HIBP_KEY, Accept: 'application/json' } }
    );
  return data;
}

export const passwords = async (password: string) => {
  const strength = zxcvbn(password);
  const feedback = strength.feedback;
  const crypto = await import('node:crypto');
  const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = hash.slice(0, 5);

  try {
    const rangeRes = await api.get(`https://api.pwnedpasswords.com/range/${prefix}`);
    const lines: string[] = (rangeRes.data as string).split('\r\n');
    const match = lines.find(line => line.split(':')[0] === hash.slice(5));
    const count = match ? Number.parseInt(match.split(':')[1], 10) : 0;
    return { strength: { score: strength.score, suggestions: feedback.suggestions, warning: feedback.warning || null }, pwnedCount: count };
  } catch (err: unknown) {
    const e = err as Error;
    console.error(e.message);
    return null;
  }
}
