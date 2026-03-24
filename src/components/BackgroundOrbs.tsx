const BackgroundOrbs = () => {
  return (
    <>
      <div className="fixed w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0 bg-primary/[0.18] -top-[200px] -right-[100px]" />
      <div className="fixed w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 bg-accent/[0.12] bottom-[20%] -left-[150px]" />
      <div className="fixed w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none z-0 bg-electric/[0.08] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

export default BackgroundOrbs;
