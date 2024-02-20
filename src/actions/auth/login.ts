'use server';

import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await sleep(2);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    //console.log({ formData555: Object.fromEntries(formData) });

    return 'Success';
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Usuario y/o contraseña no existen.';
        default:
          return 'Algo salió mal.';
      }
    }
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });
    return { ok: true };
  } catch (error) {
    console.log({ login: error });
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};