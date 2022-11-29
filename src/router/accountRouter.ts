import { Router } from "express";
import AccountController from "../controller/AccounterController";

export const accountRouter = Router();

const accountController = new AccountController();

accountRouter.get("/", accountController.getBalance);
