const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
    const { name, company, featured, sort, fields } = req.query;
    const queryObject = {};

    // Filter by name (fuzzy search)
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    // Filter by company
    if (company) {
        queryObject.company = company;
    }

    // Filter featured
    if (featured) {
        queryObject.featured = featured === 'true';
    }

    // Build query
    let result = Product.find(queryObject);

    // Sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt'); // default sort
    }

    // Select fields
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // Execute query
    const products = await result;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(queryObject);

    res.status(200).json({
        products,
        nbHits: totalProducts
    });
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({
            msg: 'Invalid product data',
            errors: Object.values(error.errors || {}).map(err => err.message)
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: `No product with id ${id}` });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ msg: 'Invalid product ID' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ msg: `No product with id ${id}` });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({
            msg: 'Invalid product data',
            errors: Object.values(error.errors || {}).map(err => err.message)
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ msg: `No product with id ${id}` });
        }
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ msg: 'Invalid product ID' });
    }
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};