import { db } from "@repo/db/client";

export default async function Home() {
const user = await db.query.users.findFirst();

  return (
    <>
      <div>This is a Next.js application.</div>
      <div>{user?.name} & {user?.email}</div>
      <div>Github Actions is working properly</div>
    </>
  )
}
