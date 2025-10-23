import { fetchNotes } from "@/lib/api/serverApi";
import {
	QueryClient,
	HydrationBoundary,
	dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	return {
		title: ` ${slug[0]} notes`,
		description: `List of ${slug[0]} notes`,
		openGraph: {
			title: ` ${slug[0]} notes`,
			description: `List of ${slug[0]} notes`,
			url: `https://notehub.com/notes/${slug.join("/")}`,
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: "Notehub",
				},
			],
		},
	};
}

const Notes = async ({ params }: Props) => {
	const { slug } = await params;
	const tag = slug[0];
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["notes", tag],
		queryFn: () => fetchNotes("", 1, tag),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient tag={tag} />
		</HydrationBoundary>
	);
};

export default Notes;
