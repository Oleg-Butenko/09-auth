import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
	title: "Notehub",
	description: "Notehub homework GoIT",
	openGraph: {
		title: "Notehub",
		description: "Notehub homework GoIT",
		url: `https://notehub.com/notes/`,
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

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto",
	display: "swap",
});

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<TanStackProvider>
					<AuthProvider>
						<Header />
						{children}
						{modal}
						<Footer />
					</AuthProvider>
				</TanStackProvider>
			</body>
		</html>
	);
}
