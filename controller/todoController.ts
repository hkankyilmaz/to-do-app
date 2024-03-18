import { prisma } from "../app";
import express, { Request, Response } from "express";

export const todoRegister = async (req: Request, res: Response) => {
  const { title, content, completed, userId } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        content,
        completed,
        userId,
      },
    });
    res.status(201).send("Todo created successfully!");
  } catch (error) {
    console.log(error);
    res.status(422).send("Please enter valid inputs!");
  }
};
export const todoUpdate = async (req: Request, res: Response) => {
  const { id, title, content, completed } = req.body;
  try {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        completed,
      },
    });
    res.status(200).send("Todo updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(422).send("Please enter valid inputs!");
  }
};

export const todoDelete = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.status(200).send("Todo deleted successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("The task doesn’t exist!");
  }
};

export const getAllwithUserId = async (req: Request, res: Response) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const todo = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    res.status(200).send("Todos fetched successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
