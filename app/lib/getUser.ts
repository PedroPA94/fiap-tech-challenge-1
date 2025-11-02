import { BASE_URL } from "../config";

const TEST_USER_ID = "120bfc22-1421-4720-adda-17954f5433c6";

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
