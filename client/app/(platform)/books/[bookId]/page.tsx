import { BookDetails } from "./_components/book-details";

const BookIdPage = ({ params: { bookId } }: { params: { bookId: number } }) => {
  return (
    <div>
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default BookIdPage;
