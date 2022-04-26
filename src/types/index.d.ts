export {};

declare global {
  export type CP<P = unknown> = Record<"children", React.ReactNode> & P;
}
