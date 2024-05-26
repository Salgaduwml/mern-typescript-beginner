import { Note } from "../types/note";
import { User } from "../types/user";

// FETCH DATA WRAPPER
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.ok) {
    return res;
  } else {
    const resBody = await res.json();
    const errorMessage = resBody.error;
    throw Error(errorMessage);
  }
}

// SIGN UP

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// LOGIN

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const res = await fetchData("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// LOGOUT

export async function logout() {
  await fetchData("/api/auth/logout", { method: "POST" });
}

// LOGGED IN USER

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData("/api/auth");
  return res.json();
}

// GET ALL NOTES

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes");
  return res.json();
}

// CREATE A NOTE

export interface NoteInput {
  title: string;
  text: string;
}

export async function createNote(note: NoteInput) {
  const res = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

// DELETE A NOTE

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
}

// UPDATE A NOTE

export async function updateNote(
  note: NoteInput,
  noteId: string
): Promise<Note> {
  const res = await fetchData("/api/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return res.json();
}
