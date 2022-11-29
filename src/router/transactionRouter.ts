import { Router } from "express";
import TransactionController from "../controller/TransactionController";

export const transactionRouter = Router();

const transactionController = new TransactionController();

transactionRouter.post("/create", transactionController.create);
transactionRouter.get(
  "/listcashout",
  transactionController.getTransactionsListCashout
);
transactionRouter.get(
  "/listcashin",
  transactionController.getTransactionsListCashin
);
