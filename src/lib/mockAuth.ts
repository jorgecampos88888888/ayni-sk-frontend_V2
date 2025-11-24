// Mock authentication functions
import { delay } from './utils';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const mockLogin = async (email: string, password: string): Promise<MockUser> => {
  await delay(600);
  if (!email || !password) throw new Error('Credenciales inválidas');

  if (email === 'admin@ayni.test' && password === 'Password1') {
    return { id: '1', name: 'Admin AYNI', email, role: 'admin' };
  }

  return { id: '2', name: 'Usuario AYNI', email, role: 'user' };
};

export const mockRegister = async (name: string, email: string, password: string): Promise<MockUser> => {
  await delay(800);
  if (!name || !email || !password) throw new Error('Datos incompletos');
  return { id: String(Math.floor(Math.random() * 10000)), name, email, role: 'user' };
};

export const mockLogout = async (): Promise<boolean> => {
  await delay(200);
  return true;
};
