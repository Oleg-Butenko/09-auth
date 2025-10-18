import { CreateNoteRequest } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteStore = {
	draft: CreateNoteRequest;
	setDraft: (note: CreateNoteRequest) => void;
	clearDraft: () => void;
};

const initialDraft: CreateNoteRequest = {
	title: "",
	content: "",
	tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
	persist(
		(set) => ({
			draft: initialDraft,
			setDraft: (note) => set(() => ({ draft: note })),
			clearDraft: () => set(() => ({ draft: initialDraft })),
		}),
		{
			name: "note-draft",
			partialize: (state) => ({ draft: state.draft }),
		}
	)
);
