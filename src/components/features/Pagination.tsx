import Button from "@/components/Button";

export default function Pagination({
  currentPage,
  onPrev,
  onNext,
}: {
  currentPage: number;
  onPrev: (currentPage: number) => void;
  onNext: (currentPage: number) => void;
}) {
  return (
    <div className="flex justify-end items-center gap-x-3">
      <Button
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPrev(-1)}
      >
        Prev
      </Button>
      <span>{currentPage}</span>
      <Button onClick={() => onNext(1)}>Next</Button>
    </div>
  );
}
