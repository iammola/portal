export const Body: React.FC<CP> = ({ children }) => {
  return (
    <section className="bg-white dark:bg-slate-dark-2 flex h-full grow flex-col justify-start overflow-y-auto">
      {children}
    </section>
  );
};
