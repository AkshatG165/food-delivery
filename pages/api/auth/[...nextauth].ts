import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB, getCollection } from '@/util/db';
import { checkPassword } from '@/util/auth';
import { CartItem } from '@/model/CartItem';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //here we need to define our won logic for credential verification
        if (!email || !email.includes('@') || !email.includes('.com'))
          throw new Error('Invalid email');

        const client = await connectToDB();
        const result = await getCollection(client, 'users').findOne({
          email: email.toLowerCase(),
        });
        client.close();

        //checking if email
        if (!result) throw new Error('User does not exist');
        //matching password
        const isValid = await checkPassword(password, result.password);
        if (isValid) {
          const user: {
            id: string;
            name: string;
            email: string;
            cartItems: CartItem[];
          } = {
            id: result.id,
            name: result.name,
            email: result.email,
            cartItems: result.cartItems,
          };
          return user;
        } else {
          client.close();
          throw new Error('Authentication failed, invalid password');
        }
      },
    }),
  ],
  secret: 'SuperSecret',
  session: {
    maxAge: 3600,
  },
  pages: {
    signIn: '/api/login',
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) return { ...token, user: user };
  //     return token;
  //   },
  //   async session({ session, token, user }: any) {
  //     return {
  //       ...session,
  //       user: { ...session.user, cartItems: token.user.cartItems },
  //     };
  //   },
  // },
};

export default NextAuth(authOptions);
