const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");
const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const safeLimit = limit ? parseInt(limit) : 10;
      const safePage = page ? parseInt(page) : 1;
      const allProducts = await productRepository.getProducts();
      const products = await productRepository.getPagedProducts(
        safePage,
        safeLimit
      );

      const responseResults = {
        products,
        currentPage: safePage,
        itemsPerPage: safeLimit,
        totalItems: allProducts.length,
        totalPages: Math.ceil(allProducts.length / safeLimit),
      };
      return res.status(200).json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
