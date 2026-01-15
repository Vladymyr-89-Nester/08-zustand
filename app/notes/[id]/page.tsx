import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://08-zustand-five-liart.vercel.app/notes/${note.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

export default async function NoteViewDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
