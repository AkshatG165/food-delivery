// https://github.com/nextauthjs/next-auth/discussions/2979
// added this file because i was not getting auto completion for session.user
// we need to define new properties in session interface & also need to add "types/**/*.ts" in tsconfig.json
// above is the refrence link for all this

import NextAuth from 'next-auth';
import { CartItem } from './model/CartItem';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      cartItems: CartItem[];
    };
  }
}
