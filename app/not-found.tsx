import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — application for creating and managing notes',
  openGraph: {
    title: 'Page not found | NoteHub',
    description: 'The page you are looking for does not exist',
    url: 'https://07-routing-nextjs-lovat-tau.vercel.app/404',
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
