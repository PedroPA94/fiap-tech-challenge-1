const TEST_USER_ID = "993a5534-26eb-4654-8bae-86420b91a402";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getUser() {
  // TODO - com pagina de login, salvar dados do usuario em cookie e buscar
  //   const cookieStore = await cookies();
  //   const userId = cookieStore.get("bytebank_user_id")?.value;

  //   if (!userId) return null;

  const res = await fetch(`${BASE_URL}/api/account/${TEST_USER_ID}`);

  if (!res.ok) return null;

  const user = await res.json();
  return user;
}
