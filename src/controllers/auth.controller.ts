import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { FindOptions} from "sequelize";
import bcrypt from "bcryptjs";
import config from "../config/config";
import jwt from "jsonwebtoken";

export class AuthController {

   public login(req: Request, res: Response) {
    const params: UserInterface = req.body;

    const options: FindOptions = {
        where: { username: params.username}
    };

    User.findOne<User>(options)
      .then((user: User) => {
       
        if (! bcrypt.compareSync( params.password, user.password)) {
            res.status(401).json({ data: "User não encontrado" });
            return;
        }
            //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "24h" }
        );
  
        res.json({
            'id':user.id,
            'nome':user.nome,
            'token':token
        })
      })
      .catch((err: Error) => res.status(500).json(err));
  }
  
  
}