"use client";
import React, { ReactNode } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const Apolloprovider = ({ children }: { children: ReactNode }) => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: process.env.NEXT_APOLLO_URL,
    })
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};