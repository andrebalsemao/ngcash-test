import { Request, Response } from "express";
import TransactionBusiness from "../business/TransactionBusiness";
import { ItransactionDTO } from "../model/Transaction";

class TransactionController {
  public create = async (req: Request, res: Response) => {
    try {
      const input: ItransactionDTO = {
        token: req.headers.authorization as string,
        value: req.body.value,
        creditedAccount: req.body.creditedAccount,
      };

      const transactionBusiness = new TransactionBusiness();

      const response = await transactionBusiness.create(input);

      res.status(201).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };

  public getTransactionsListCashout = async (req: Request, res: Response) => {
    try {
      const input = {
        token: req.headers.authorization!,
      };

      const transactionBusiness = new TransactionBusiness();

      const response = await transactionBusiness.getTransactionsIn(input);

      res.status(200).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };
  public getTransactionsListCashin = async (req: Request, res: Response) => {
    try {
      const input = {
        token: req.headers.authorization!,
      };

      const transactionBusiness = new TransactionBusiness();

      const response = await transactionBusiness.getTransactionsIn(input);

      res.status(200).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };
  public getBalance = async (req: Request, res: Response) => {
    try {
      const input = {
        token: req.headers.authorization!,
      };

      const transactionBusiness = new TransactionBusiness();

      const response = await transactionBusiness.getTransactionsIn(input);

      res.status(200).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };
}

export default TransactionController;
