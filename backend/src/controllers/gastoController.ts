import type { Request, Response } from 'express';

class GastoController {
    create(req: Request, res: Response) {
      const { nome, valor } = req.body;
      
    }
    read(req: Request, res: Response) {
        // Implementation for reading user data
    }
    update(req: Request, res: Response) {
        // Implementation for updating user data
    }
    delete(req: Request, res: Response) {  
        // Implementation for deleting a user
   }
}

export { GastoController };