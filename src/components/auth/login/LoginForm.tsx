'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationCircle } from 'react-icons/io5';

export const LoginForm = () => {
  //const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);
  useEffect(() => {
    if (state === 'Success') {
      //router.refresh();
      //router.replace("/");
      window.location.replace('/profile');
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name="email" />

      <label htmlFor="password">Contraseña</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" name="password" />

      <LoginButton />
      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {state && (
          <>
            <IoInformationCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state}</p>
          </>
        )}
      </div>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className={clsx({
          'btn-primary': !pending,
          'btn-disabled': pending,
        })}
        disabled={pending}>
        Ingresar
      </button>
      {/* <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button> */}
    </>
  );
}
