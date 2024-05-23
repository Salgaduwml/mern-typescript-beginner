import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../types/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import * as NotesApi from "../network/note_api";

interface AddNoteDialogProps {
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}

const AddNoteDialog = ({ onDismiss, onNoteSave }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();
  async function onSubmit(note: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNote(note);
      onNoteSave(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!!errors.title}
              placeholder="Title"
              {...register("title", { required: "Title is required!" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text"
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
