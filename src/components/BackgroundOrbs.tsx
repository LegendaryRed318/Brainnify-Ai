const BackgroundOrbs = () => {
  return (
    <>
      <div className="fixed w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0 bg-primary/[0.18] -top-[200px] -right-[100px]" />
      <div className="fixed w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 bg-accent/[0.12] bottom-[20%] -left-[150px]" />
      <div className="fixed bottom-0 left-1/4 right-1/4 h-[300px] bg-gradient-to-t from-primary/[0.06] to-transparent blur-3xl pointer-events-none z-0" />
    </>
  );
};

export default BackgroundOrbs;
