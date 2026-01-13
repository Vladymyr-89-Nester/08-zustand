'use client';

import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default function NoteDetailsClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!data) {
    return <ErrorMessage message='Note not found.' />;
  }

  return (
    <div>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>

          <p className={css.content}>{data?.content}</p>

          <p className={css.date}>{data?.createdAt}</p>
        </div>
        <span className={css.tag}>{data?.tag}</span>
      </div>
      <button className={css.link} type='button' onClick={handleBack}>
        Go Back
      </button>
    </div>
  );
}
