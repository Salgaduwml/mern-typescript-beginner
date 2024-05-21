import { RequestHandler } from "express";
import noteModel from "../models/note.model";

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
    const note = await noteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const note = await noteModel.create({ title: title, text: text });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
