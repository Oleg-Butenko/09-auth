"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface Props {
	tag?: string;
}

const NotesClient = ({ tag }: Props) => {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [page, setPage] = useState(1);

	const debounced = useDebouncedCallback((value: string) => {
		setDebouncedQuery(value);
		setPage(1);
	}, 1000);

	const handleSearch = (text: string) => {
		setQuery(text);
		debounced(text);
	};

	const { data, isFetching } = useQuery({
		queryKey: ["notes", debouncedQuery, page, tag],
		queryFn: () => fetchNotes(debouncedQuery, page, tag),
		placeholderData: keepPreviousData,
	});

	const totalPages = data?.totalPages ?? 0;

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox value={query} onChange={handleSearch} />
				{totalPages > 1 && (
					<Pagination totalPages={totalPages} page={page} setPage={setPage} />
				)}
				<Link href={"/notes/action/create"} className={css.button}>
					Create note +
				</Link>
			</header>
			<div style={{ position: "relative" }}>
				{data?.notes && data.notes.length > 0 && (
					<NoteList notes={data.notes} />
				)}
				{isFetching && <Loader />}
			</div>
		</div>
	);
};

export default NotesClient;
