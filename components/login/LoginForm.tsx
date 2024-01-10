import classes from './LoginForm.module.css';
import Card from '../ui/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const query = router.query;

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query && query.signup === 'true') {
      const data = {
        name: name.current ? name.current.value : '',
        email: email.current ? email.current.value : '',
        password: password.current ? password.current.value : '',
      };
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) setError((await res.json()).message);
      else {
        if (name.current) name.current.value = '';
        if (email.current) email.current.value = '';
        if (password.current) password.current.value = '';
        setError(null);
        router.replace('/login');
      }
    } else {
      const res = await signIn('credentials', {
        email: email.current ? email.current.value : '',
        password: password.current ? password.current.value : '',
        redirect: false,
      });

      if (res && !res.ok) setError(res.error);
      else {
        if (email.current) email.current.value = '';
        if (password.current) password.current.value = '';
        setError(null);
        router.replace('/');
      }
    }
  };

  return (
    <Card className={classes.login}>
      <div className={classes.left}>
        {query && query.signup === 'true' ? (
          <div>
            <h3>Looks like you're new here!</h3>
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
          {error && <p className={classes.error}>{error}</p>}
          {query && query.signup === 'true' && (
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter name"
              required
              ref={name}
            />
          )}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            ref={email}
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            ref={password}
          />
          <button type="submit">
            {query && query.signup === 'true' ? 'Signup' : 'Login'}
          </button>
        </form>
        {query && query.signup === 'true' ? (
          <p>
            Existing user?
            <Link href="/login">Login</Link>
          </p>
        ) : (
          <p>
            Don't have an account yet?
            <Link href="/login?signup=true">Register</Link>
          </p>
        )}
      </div>
    </Card>
  );
}
