import React from "react";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "New note",
	description: "Create your new note",
	openGraph: {
		title: "New note",
		description: "Create your new note",
		url: `https://notehub.com/notes/action/create`,
		images: [
			{
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
				width: 1200,
				height: 630,
				alt: "New note",
			},
		],
	},
};

const ProfilePage = () => {
	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<div className={css.header}>
					<h1 className={css.formTitle}>Profile Page</h1>
					<Link href="" className={css.editProfileButton}>
						Edit Profile
					</Link>
				</div>
				<div className={css.avatarWrapper}>
					<img
						src="User Avatar"
						alt="User Avatar"
						width={120}
						height={120}
						className={css.avatar}
					/>
				</div>
				<div className={css.profileInfo}>
					<p>Username: your_username</p>
					<p>Email: your_email@example.com</p>
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
