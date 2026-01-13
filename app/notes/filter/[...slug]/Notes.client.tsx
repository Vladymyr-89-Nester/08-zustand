'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import css from './page.module.css';
import { fetchNotes } from '@/lib/api';
import { useEffect, useRef, useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [queryDebounce] = useDebounce(query.trim(), 700);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const hasShownEmptyToast = useRef(false);
  const prevQuery = useRef('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, queryDebounce, tag],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: 12,
        search: queryDebounce,
        tag: tag === 'all' ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (queryDebounce !== prevQuery.current) {
      hasShownEmptyToast.current = false;
      prevQuery.current = queryDebounce;
    }

    const shouldShowToast =
      !isLoading && !error && queryDebounce !== '' && data?.notes.length === 0;

    if (shouldShowToast && !hasShownEmptyToast.current) {
      toast('No notes found for your search', {
        icon: 'ℹ️',
        duration: 5000,
      });
      hasShownEmptyToast.current = true;
    }
  }, [data, isLoading, error, queryDebounce]);

  const handleSearchChange = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <Toaster position='top-right' />
      <header className={css.toolbar}>
        <SearchBox query={query} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
