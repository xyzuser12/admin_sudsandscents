import clientPromise from "@/lib/mongodb";

export async function getAdmins() {
  const client = await clientPromise;
  const admins = await client.db().collection("admins").find().toArray();
  return admins.map((admin) => admin.email);
}
