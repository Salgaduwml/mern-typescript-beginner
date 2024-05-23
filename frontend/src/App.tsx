import { useEffect, useState } from "react";
import { Note as NoteModel } from "./types/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import styledUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/note_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showModel, setShowModel] = useState(false);

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

  return (
    <Container>
      <Button
        onClick={() => setShowModel(true)}
        className={`${styledUtils.blockCenter} mb-4`}
      >
        Add Note
      </Button>
      <Row sx={1} md={2} lg={3} xl={4} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showModel && (
        <AddNoteDialog
          onDismiss={() => setShowModel(false)}
          onNoteSave={(note) => {
            setShowModel(false);
            setNotes((prev) => [...prev, note]);
          }}
        />
      )}
    </Container>
  );
}

export default App;
