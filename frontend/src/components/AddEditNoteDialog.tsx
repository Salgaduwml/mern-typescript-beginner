import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../types/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSave,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });
  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(input, noteToEdit._id);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSave(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            error={errors.title}
            register={register}
            registerOptions={{ required: "Title is required!" }}
          />
          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            placeholder="Text"
            register={register}
          />
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

export default AddEditNoteDialog;
