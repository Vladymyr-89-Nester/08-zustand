import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const generateCategory = (): string => {
    if (slug[0] === 'all') return 'all';

    return slug[0];
  };
  return {
    title: 'NoteHub Category',
    description: `Viewing notes filtered by ${generateCategory()}`,
    openGraph: {
      title: 'NoteHub Category',
      description: `Viewing notes filtered by ${generateCategory()}`,
      url: `https://08-zustand-five-liart.vercel.app/notes/filter/${generateCategory()}`,
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

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const {
    slug: [tag],
  } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag: tag === 'all' ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
