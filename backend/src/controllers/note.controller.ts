import { RequestHandler } from "express";
import noteModel from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await noteModel.findById(noteId).exec();

    if (!note) {
      console.log("hello");
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    if (!title) {
      throw createHttpError(400, "Title is required");
    }
    const note = await noteModel.create({ title: title, text: text });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
