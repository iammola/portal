export const Body: React.FC<CP> = ({ children }) => {
  return (
    <section className="flex h-full grow flex-col justify-start overflow-y-auto bg-white dark:bg-slate-dark-1">
      {children}
    </section>
  );
};
