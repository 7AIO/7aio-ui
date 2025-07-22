import api from "~/lib/api";

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export async function getUser(): Promise<IUser> {
  try {
    const response = await api.get("/api/users/me");
    return response.data.data as IUser;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
