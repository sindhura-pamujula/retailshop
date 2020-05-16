import ProductType from '../models/ProductType';
import express ,{ Application ,Request,Response} from 'express';
import bodyParser from 'body-parser';
import app from '../app';
export class ProductTypeRoutes{

    public routes(app:any):void{
        app.get('/producttype',async (req:Request,res:Response)=>{
            const productslist = await ProductType.findAll({ });
            console.log('productslist are '+JSON.stringify(productslist));
            res.send(productslist);
        });
        app.post('/producttype',async(req:Request,res:Response)=>{
            const newtype = await ProductType.create({
                producttype: req.body.producttype
              });
              console.log('new producttype'+newtype);
              res.send(newtype);
            
        });
    
    }
    
}