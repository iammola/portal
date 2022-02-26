import sharp from "sharp";
import { drive, auth } from "@googleapis/drive";

const API_CRED = process.env.GOOGLE_API_CRED;

if (!API_CRED)
  throw new Error(
    "Please define the API_CRED environment variable inside .env.local"
  );

const keys = JSON.parse(API_CRED) as GoogleAPICred;

export async function uploadImage(dataURL: string) {
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
