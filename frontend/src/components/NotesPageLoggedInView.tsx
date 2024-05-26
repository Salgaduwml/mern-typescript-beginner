import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as NotesApi from "../network/note_api";
import styles from "../styles/Note.module.css";
import styledUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../types/note";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showModel, setShowModel] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotes();
  }, []);

  async function handleDelete(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((currentNote) => currentNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <>
      <Button
        onClick={() => setShowModel(true)}
        className={`${styledUtils.blockCenter} mb-4`}
      >
        Add Note
      </Button>
      <Row sx={1} md={2} lg={3} xl={4} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteClick={handleDelete}
            />
          </Col>
        ))}
      </Row>
      {showModel && (
        <AddEditNoteDialog
          onDismiss={() => {
            setShowModel(false);
          }}
          onNoteSave={(note) => {
            setShowModel(false);
            setNotes((prev) => [...prev, note]);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSave={(updatedNote) => {
            setNotes(
              notes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
