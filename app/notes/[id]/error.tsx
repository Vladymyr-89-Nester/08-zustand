'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface Props {
  error: Error;
}

export default function NoteError({ error }: Props) {
  return (
    <ErrorMessage message={`Could not fetch note details. ${error.message}`} />
  );
}
