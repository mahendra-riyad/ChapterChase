const Category = require('../models/category');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { request } = require('express');
const {CONSTANT} = require('../common/constant.common')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};

exports.create = async (req, res) => {
    try { 
        const category = new Category(req.body);
        let result = category.save();
        req.cacheKey = CONSTANT.CACHE_KEY.CATEGORY;
        res.json({ result });
    }
    catch (error) { 
        console.log(`we got error while creating category ${error}`)
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    Product.find({ category }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            });
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
};

exports.list = async (req, res) => {
    try {
        const result = await Category.find().cache({ key: CONSTANT.CACHE_KEY.CATEGORY });

        res.json(result);
        
    } catch (error) {
        console.log(`we got an error while fetching categories list: ${error}`);
        return res.status(400).json({
            error: errorHandler(err)
        });
    } 
};
