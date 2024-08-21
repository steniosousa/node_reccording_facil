import { NextFunction, Request, Response, Router } from 'express'
import { schemaValidator } from './validator/schemaValidator'
import { LoginFactore } from './factories/login/login'
import { loginSchema } from './useCase/login/login.dto'
import { AuthMiddleware } from './Middleware/Authentication/Auth.contract'
import { AutoCheckCreateUser } from './factories/AutoCheck/AutoCheckCreateUser'
import { createTruckDriverSchema } from './useCase/AutoCheck/truckDriver/create/dto'
import upload from './multerConfig';
import { AutoCheckIdentifyUser } from './factories/AutoCheck/AutoCheckIdentifyUser'
const routes = Router()

const iLogin = LoginFactore()


//AutoCheck
const createUserAutoCheck = AutoCheckCreateUser()
const IdentifyAutoCheckUser = AutoCheckIdentifyUser()


routes.post('/login', schemaValidator(loginSchema), (req: Request, res: Response) => iLogin.execute(req, res))
routes.post('/AutoCheck/truckDriverUser/create',
    upload.single('photo'),
    // (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), // Middleware de autenticação
    schemaValidator(createTruckDriverSchema), // Validação do schema
    (req: Request, res: Response) => createUserAutoCheck.execute(req, res) // Controlador
);

routes.get('/AutoCheck/truckDriverUser/check',
    // (req: any, res: Response, next: NextFunction) => AuthMiddleware(req, res, next), // Middleware de autenticação
    (req: Request, res: Response) => IdentifyAutoCheckUser.execute(req, res) // Controlador
);


export { routes }


