declare module "mongoose-lean-virtuals" {
  import { Schema } from "mongoose";
  export default function mongooseLeanVirtuals(schema: Schema): void;
}

declare module "if-emoji" {
  export default function ifEmoji(emoji: string): boolean;
}
