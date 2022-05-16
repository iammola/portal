export {};
import type { NextConfig } from "next";

declare global {
  export type CP<P = unknown, C extends React.ReactNode = React.ReactNode> = { children?: C } & (P extends null
    ? unknown
    : Omit<P, "children">);
}

export type NextBundleAnalyzer = {
  (opt?: { enabled?: boolean }): (nextConfig: NextConfig) => NextConfig;
};
