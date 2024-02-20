import classes from './LoginForm.module.css';
import Card from '../ui/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notification-slice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()) };

    if (query && query.signup === 'true') {
      setIsLoading(true);
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      setIsLoading(false);

      if (!res.ok) {
        const message = (await res.json()).message;
        dispatch(showNotification({ type: 'failure', message }));
      } else router.replace('/login');
    } else {
      setIsLoading(true);
      const res = await signIn('credentials', { ...data, redirect: false });
      setIsLoading(false);

      if (res && !res.ok)
        dispatch(showNotification({ type: 'failure', message: res.error! }));
      else router.replace('/');
    }
  };

  return (
    <Card className={classes.login}>
      <div className={classes.left}>
        {query && query.signup === 'true' ? (
          <div>
            <h3>{"Looks like you're new here!"}</h3>
            <p>Sign up with your email to get started.</p>
          </div>
        ) : (
          <div>
            <h3>Login</h3>
            <p>Order delicious food, get access to your orders & more.</p>
          </div>
        )}
      </div>
      <div className={classes.right}>
        <form onSubmit={handleOnSubmit}>
          {query && query.signup === 'true' && (
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter name"
              required
            />
          )}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            disabled={isLoading || status === 'authenticated'}
          >
            {query && query.signup === 'true'
              ? isLoading
                ? 'Signing up...'
                : 'Signup'
              : isLoading
              ? 'Logging in...'
              : 'Login'}
          </button>
        </form>
        {query && query.signup === 'true' ? (
          <p>
            Existing user?
            <Link href="/login">Login</Link>
          </p>
        ) : (
          <p>
            {"Don't have an account yet?"}
            <Link href="/login?signup=true">Register</Link>
          </p>
        )}
      </div>
    </Card>
  );
}
