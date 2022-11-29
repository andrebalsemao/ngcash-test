import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { IUserDTO, IUserLoginDTO } from "../model/User";

class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const input: IUserDTO = {
        userName: req.body.userName,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();

      const response = await userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: IUserLoginDTO = {
        userName: req.body.userName,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();

      const response = await userBusiness.login(input);

      res.status(201).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };

  public balance = async (req: Request, res: Response) => {
    try {
      const input: IUserLoginDTO = {
        userName: req.body.userName,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();

      const response = await userBusiness.login(input);

      res.status(201).send(response);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || error.sqlMessage });
    }
  };
}

export default UserController;
