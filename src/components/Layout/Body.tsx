export const Body: React.FC<CP> = ({ children }) => {
  return (
    <section className="bg-white dark:bg-slate-dark-1 flex h-full grow flex-col justify-start overflow-y-auto">
      {children}
    </section>
  );
};
