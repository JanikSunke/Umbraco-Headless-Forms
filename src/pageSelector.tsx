import { useCallback } from 'react';

import { useFormState } from './providers/formsStateProvider';

export default function PageSelector({
  page,
  setPage,
}: {
  page: number;
  setPage: (page: number) => void;
}) {
  const {
    state: { form },
  } = useFormState();

  const handlePreviousPage = useCallback(() => setPage(page - 1), [page, setPage]);
  const handleNextPage = useCallback(() => setPage(page + 1), [page, setPage]);

  const maxPages = form.pages.length;

  return (
    <div className="umb-h-pageSelector">
      <button
        className="umb-h-button"
        disabled={page === 0}
        onClick={handlePreviousPage}
        type="button"
      >
        {form.previousLabel ?? 'Previous'}
      </button>
      <button
        className="umb-h-button"
        disabled={page === maxPages - 1}
        onClick={handleNextPage}
        type="button"
      >
        {form.nextLabel ?? 'Next'}
      </button>
      <div className="umb-h-container">
        {page + 1} / {maxPages}
      </div>
    </div>
  );
}
