import { randomBytes } from "crypto";

import sharp from "sharp";
import { drive, auth } from "@googleapis/drive";

const CRED = process.env.DRIVE_API_CRED;
const FOLDER = process.env.DRIVE_IMAGES_FOLDER;

if (!CRED) throw new Error("Please define the GOOGLE_API_CRED env variable");

const dataURLRegex = /,(.+)/;
const keys = JSON.parse(CRED) as GoogleAPICred;

export async function uploadImage(dataURL?: string) {
  if (!dataURL) return;

  if (!FOLDER)
    throw new Error("Please define the DRIVE_IMAGES_FOLDER env variable");

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
 * This URL template can also be gotten with by accessing the `drive.files.get` method
 * 
 * @example
 * 
 * ```js
 * const file = await client.files.get({
     fileId: id,
     fields: "webContentLink",
  });
  return file.webContentLink; // link to download file
 * ```
 * 
 * @param id The file's ID
 * @returns A link to download the file
 */
export const getImage = (id?: string) => {
  if (!id) return;

  return dataURLRegex.test(id)
    ? id
    : `https://drive.google.com/uc?id=${id}&export=download`;
};

interface GoogleAPICred {
  private_key: string;
  client_email: string;
}
