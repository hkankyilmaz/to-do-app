import { prisma } from "../app";
import express, { Request, Response } from "express";

export const userRegister = async (req: Request, res: Response) => {
  const { id, fullname, email, password } = req.body;
  console.log(fullname, email, password);

  try {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password,
      },
    });
    res.status(201).send("User created successfully!");
  } catch (error) {
    console.log(error);
    res.status(422).send("Please enter valid inputs!");
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.password === password) {
      res.status(200).send("User logged in successfully!");
    } else {
      res.status(401).send("User doesn’t exist or wrong password");
    }
  } catch (error) {
    res.status(401).send("User doesn’t exist or wrong password");
  }
};
