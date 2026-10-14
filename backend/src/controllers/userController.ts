import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import type { Response, Request } from "express";
import type { SinginRequest, SingUpRequest } from "../@types/types";
import { User } from "../models/usersModel";
import { jwtConfig } from "../config/auth";

class UserController {
    async signup(req: Request<SingUpRequest>, res: Response) {
        const { email, password } = req.body

        const verifyEmail = await User.findOne({ email })
        if(verifyEmail) {
            return res.status(409).json({ "error": "Email já se encontra em uso"})
        }
        
        const passwordHash = await bcrypt.hash(password, 8)
        const newAccount = new User({ email, password: passwordHash })
        await newAccount.save()
        res.status(201).json({ "sucess!": "Conta criada" })
    }

    async signin(req: Request<SinginRequest>, res: Response) {
        const { email, password } = req.body
        if(!email || !password) { 
            return res.status(400).json({ "error": "Email ou Senha não declarados"})
        }
        
        const verifyEmail = await User.findOne({ email })
        if(!verifyEmail) {
            return res.status(409).json({ "error": "Email declarado inexistente"})
        }

        const verifyPassword = await bcrypt.compare(password, verifyEmail.password)
        if(!verifyPassword) {
            return res.status(409).json({ "error": "Senha declarada incorreta"})
        }
      
      const user = {
        id: verifyEmail.id,
        email: verifyEmail.email,
      }
      
      const token = jwt.sign({ id: verifyEmail.id },jwtConfig.secret)
      return res.json(200).json({ token, user })
    }
}

export { UserController };