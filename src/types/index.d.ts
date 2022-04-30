export {};

declare global {
  export type CP<P = unknown, C extends React.ReactNode = React.ReactNode> = { children?: C } & (P extends null
    ? unknown
    : Omit<P, "children">);
}
