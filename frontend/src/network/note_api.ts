import { Note } from "../types/note";

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

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes");
  return res.json();
}

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
