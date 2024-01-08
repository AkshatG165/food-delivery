import classes from './LoginForm.module.css';
import Card from '../ui/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const router = useRouter();
  const query = router.query;

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
        <form>
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
