import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ethers } from 'ethers';
import db from './db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Ethereum Wallet',
            credentials: {
                nonce: { label: 'Nonce', type: 'text' },
                signature: { label: 'Signature', type: 'text' },
                address: { label: 'Wallet Address', type: 'text' },
            },
            async authorize(credentials) {
                const { signature, nonce, address } = credentials as {
                    signature: string;
                    nonce: string;
                    address: string;
                };

                const message = nonce;

                try {
                    const recoveredAddress = ethers.verifyMessage(message, signature);
                    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
                        const user = await db.user.upsert({
                            where: { address: address.toLowerCase() },
                            update: {},
                            create: { address: address.toLowerCase() },
                        });
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Signature verification failed:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,  // Set JWT session to 30 days (persistent session)
        updateAge: 24 * 60 * 60,    // Update the session every 24 hours
    },
    secret: process.env.NEXTAUTH_JWT_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            // Store wallet address in token if user object exists (i.e., on successful login)
            if (user) {
                token.address = (user as { address?: string }).address;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass the address from the token to the session object
            if (token?.address) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    address: token.address as string,  // Add the address to the user object in the session
                };
            }
            return session;
        },
    },
};
