import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../types/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let lastUpdated: string;
  if (updatedAt > createdAt) {
    lastUpdated = "Updated: " + formatDate(updatedAt);
  } else {
    lastUpdated = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{lastUpdated}</Card.Footer>
    </Card>
  );
};

export default Note;
