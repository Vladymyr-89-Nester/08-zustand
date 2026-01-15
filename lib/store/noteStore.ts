import { create } from 'zustand';
import { CreateNoteParams } from '../api';
import { persist } from 'zustand/middleware';

const initialDraft: CreateNoteParams = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
  draft: CreateNoteParams;
  setDraft: (note: CreateNoteParams) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: 'note-draft', partialize: state => ({ draft: state.draft }) }
  )
);
