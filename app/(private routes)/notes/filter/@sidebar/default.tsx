import Link from "next/link";
import css from "./SideBarNotes.module.css";
import type { Tag } from "@/types/note";

const tagsList: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const SideBarNotes = () => {
	return (
		<ul className={css.menuList}>
			<li className={css.menuItem}>
				<Link className={css.menuLink} href={`/notes/filter/All`}>
					All notes
				</Link>
			</li>
			{tagsList.map((tag) => (
				<li key={tag} className={css.menuItem}>
					<Link className={css.menuLink} href={`/notes/filter/${tag}`}>
						{tag}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default SideBarNotes;
