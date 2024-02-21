// Resource: https://docs.uploadthing.com/nextjs/appdir#creating-your-first-fileroute

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	media: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } }).onUploadComplete(async ({ metadata, file }) => {
		console.log("file url", file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
