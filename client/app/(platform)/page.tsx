import { BooksContainer } from "./_components/books-container";

const HomePage = () => {
  return (
    <div className="flex-1 pt-24">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <BooksContainer />
      </div>
    </div>
  );
};

export default HomePage;
