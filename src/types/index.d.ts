export {};

declare global {
  export type CP<P = unknown> = { children?: React.ReactNode } & P;
}
