import { randomBytes } from "crypto";

import sharp from "sharp";
import { drive, auth } from "@googleapis/drive";

const CRED = process.env.DRIVE_API_CRED;
const FOLDER = process.env.DRIVE_IMAGES_FOLDER;

if (!CRED) throw new Error("Please define the GOOGLE_API_CRED env variable");

const dataURLRegex = /,(.+)/;
const keys = JSON.parse(CRED) as GoogleAPICred;

/**
 * It takes a base64 encoded image, uploads it to Google Drive, and returns the file ID
 * @param {string} [dataURL] - The base64 encoded image data.
 * @returns The ID of the uploaded file
 */
export async function uploadImage(dataURL?: string) {
  if (!dataURL) return;

  if (!FOLDER) throw new Error("Please define the DRIVE_IMAGES_FOLDER env variable");

  const [, base64] = dataURL.split(dataURLRegex);
  const client = drive({
    version: "v3",
    auth: new auth.JWT({
      key: keys.private_key,
      email: keys.client_email,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    }),
  });

  const name = randomBytes(32).toString("hex");
  const { data: upload } = await client.files.create({
    fields: "id",
    media: {
      mimeType: "image/webp",
      body: sharp(Buffer.from(base64, "base64")).toFormat("webp"),
    },
    requestBody: {
      name: `${name}.webp`,
      parents: [FOLDER],
    },
  });

  if (upload.id == undefined) throw new Error("Error uploading file");

  await client.permissions.create({
    fileId: upload.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return upload.id;
}

/**
 * If the id is a data URL, return it, otherwise return a Google Drive URL
 * @param {string} [id] - The id of the image.
 * @returns a dataURL if the id is a dataURL, otherwise it returns a google drive url.
 */
export const getImage = (id?: string) => {
  if (!id) return;

  return dataURLRegex.test(id) ? id : `https://drive.google.com/uc?id=${id}&export=download`;
};

type GoogleAPICred = {
  private_key: string;
  client_email: string;
};
