import { Metadata } from 'next';
import CreateNote from './CreateNote.client';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub',
    url: 'https://08-zustand-five-liart.vercel.app/notes/action/create',
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

export default function PageCreateNote() {
  return <CreateNote />;
}
