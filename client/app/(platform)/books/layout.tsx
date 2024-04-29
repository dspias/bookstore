const BookIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 pt-24">
      <div className="container flex-1 items-start">
        {children}
      </div>
    </div>
  );
};

export default BookIdLayout;
