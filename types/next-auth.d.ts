
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            address?: string;
            id?: string;
            // Add other custom fields here if necessary
        };
    }

    interface JWT {
        address?: string;
        id?: string;
    }
}