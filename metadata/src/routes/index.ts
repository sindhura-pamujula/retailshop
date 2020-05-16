import { Application,Request, Response } from 'express';
import { ProductTypeRoutes } from './productType';
export class Routes {
    public productTypeRoutes: ProductTypeRoutes = new ProductTypeRoutes();

    public routes(app:Application): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Welcome to the awesome api.. :)!!"
            });
        });
        this.productTypeRoutes.routes(app);    
    }
}