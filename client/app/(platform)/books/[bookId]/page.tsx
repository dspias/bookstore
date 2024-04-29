import { BookDetails } from "./_components/book-details";

const BookIdPage = async ({
  params: { bookId },
}: {
  params: { bookId: number };
}) => {
  return (
    <div>
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default BookIdPage;
