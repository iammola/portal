import sharp from "sharp";
import { drive, auth } from "@googleapis/drive";

const API_CRED = process.env.GOOGLE_API_CRED;
const FOLDER = process.env.DRIVE_IMAGES_FOLDER;

if (!API_CRED)
  throw new Error("Please define the GOOGLE_API_CRED env variable");

const keys = JSON.parse(API_CRED) as GoogleAPICred;

export async function uploadImage(dataURL: string) {
  if (!FOLDER)
    throw new Error("Please define the DRIVE_IMAGES_FOLDER env variable");

  const [, base64] = dataURL.split(/,(.+)/);
  const client = drive({
    version: "v3",
    auth: new auth.JWT({
      key: keys.private_key,
      email: keys.client_email,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    }),
  });

  const { data: upload } = await client.files.create({
    fields: "id",
    media: {
      mimeType: "image/webp",
      body: sharp(Buffer.from(base64, "base64")).toFormat("webp"),
    },
    requestBody: {
      name: "hey.webp",
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

interface GoogleAPICred {
  type: "service_account";
  auth_uri: string;
  token_uri: string;
  client_id: string;
  project_id: string;
  private_key: string;
  client_email: string;
  private_key_id: string;
  client_x509_cert_url: string;
  auth_provider_x509_cert_url: string;
}
