"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";
import type { CreateNoteRequest } from "../../types/note";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

const NoteForm = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { draft, setDraft, clearDraft } = useNoteStore();

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setDraft({
			...draft,
			[event.target.name]: event.target.value,
		});
	};

	const mutation = useMutation({
		mutationFn: (newNote: CreateNoteRequest) => createNote(newNote),
		onSuccess: () => {
			clearDraft();
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			router.push("/notes/filter/All");
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const values = Object.fromEntries(formData) as unknown as CreateNoteRequest;

		mutation.mutate(values, {
			onSettled: () => {
				event.currentTarget.reset();
			},
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={css.formGroup}>
				<label htmlFor="title">Title</label>
				<input
					value={draft?.title}
					onChange={handleChange}
					id="title"
					type="text"
					name="title"
					className={css.input}
				></input>
			</div>
			<div className={css.formGroup}>
				<label htmlFor="content">Content</label>
				<textarea
					value={draft?.content}
					onChange={handleChange}
					id="content"
					name="content"
					rows={8}
					className={css.textarea}
				></textarea>
			</div>

			<div className={css.formGroup}>
				<label htmlFor="tag">Tag</label>
				<select
					value={draft?.tag}
					onChange={handleChange}
					id="tag"
					name="tag"
					className={css.select}
				>
					<option value="Todo">Todo</option>
					<option value="Work">Work</option>
					<option value="Personal">Personal</option>
					<option value="Meeting">Meeting</option>
					<option value="Shopping">Shopping</option>
				</select>
			</div>
			<div className={css.actions}>
				<button
					onClick={() => router.push("/notes/filter/All")}
					type="button"
					className={css.cancelButton}
				>
					Cancel
				</button>
				<button
					type="submit"
					className={css.submitButton}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? "Loading..." : "Create note"}
				</button>
			</div>
		</form>
	);
};

export default NoteForm;
