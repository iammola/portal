const Section: Section = ({ children, description, title }) => {
  return (
    <section className="flex w-full items-stretch justify-start rounded-lg bg-white p-7 shadow-md md:gap-x-6 lg:gap-x-12">
      <div className="md:w-[27rem]">
        <h3 className="text-lg font-medium text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8 xl:w-[40rem]">{children}</div>
    </section>
  );
};

type Section = React.FC<
  CP<{
    title: string;
    description: string;
  }>
>;

export default Section;
