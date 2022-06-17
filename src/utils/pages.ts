import { USER_LEVEL_COOKIE } from "utils/constants";

import type { NextApiRequest } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export async function verifyLevel(
  req: Pick<NextApiRequest, "cookies">,
  allowed: Schemas.User.Level | Schemas.User.Level[]
) {
  const { [USER_LEVEL_COOKIE]: level } = req.cookies;
  return !![allowed].flat().find((a) => level.startsWith(a));
}
