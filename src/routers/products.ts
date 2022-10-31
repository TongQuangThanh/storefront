import express, { Request, Response } from 'express';
import { adminAuthorization } from '../middleware/token';
import { Product, ProductStore } from '../models/products';
import { errorMissingField, generateErrorOnCreate, generateErrorOnFetch } from '../utils';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('product'));
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const product = await store.show(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('product'));
  }
};

const showProductPopular = async (req: Request, res: Response) => {
  try {
    const product = await store.popular();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('product'));
  }
};

const showProductByCategory = async (req: Request, res: Response) => {
  const category = req.body.category;
  if (!category) {
    res.status(400).json(errorMissingField);
    return;
  }
  try {
    const product = await store.showProductByCategory(category);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('product'));
  }
};

const create = async (req: Request, res: Response) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  if (!name || !price) {
    res.status(400).json(errorMissingField);
    return;
  }
  try {
    const product: Product = {
      id: 0,
      name,
      price,
      category
    };
    const createdProduct = await store.create(product);
    res.status(200).json(createdProduct);
  } catch (error) {
    res.status(400).json(generateErrorOnCreate('product', name));
  }
};

const productRouters = (app: express.Application) => {
  app.get('/products', index);                            // user see all products
  app.get('/products/category', showProductByCategory);   // user see product by category
  app.get('/products/popular', showProductPopular);       // user see top best buy product
  app.get('/products/:id', show);                         // user see product
  app.post('/products', adminAuthorization, create);      // admin create product
};

export default productRouters;