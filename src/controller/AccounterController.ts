import { Request, Response } from "express";
import AccountBussines from "../business/AccountBusiness";
import TransactionBusiness from "../business/TransactionBusiness";
import { ItransactionDTO, ItransactionListDTO } from "../model/Transaction";

class AccountController {
  public getBalance = async (req: Request, res: Response) => {
    try {
      const input = {
        token: req.headers.authorization!,
      };

      const accountBusiness = new AccountBussines();

      const response = await accountBusiness.balance(input);

      res.status(200).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };
}

export default AccountController;
