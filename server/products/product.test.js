const request = require("supertest");
const path = require("path");
const jestOpenAPI = require("jest-openapi").default;
const app = require("../app");
const db = require("../db");
const productRepository = require("./product.repository");

jestOpenAPI(path.join(__dirname, "../apispec.yaml"));

describe("GIVEN that the GET /products route exist", () => {
  afterAll(() => {
    db.end();
  });

  test("WHEN there are products THEN return status 200 and an array of products", async () => {
    const totalProducts = await productRepository.getProducts();
    const defaultLimit = 10;

    const expectedResponseData = {
      products: await productRepository.getPagedProducts(1, defaultLimit),
      currentPage: 1,
      itemsPerPage: defaultLimit,
      totalItems: totalProducts.length,
      totalPages: Math.ceil(parseInt(totalProducts.length) / defaultLimit),
    };

    const response = await request(app)
      .get("/api/products")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseData);
    expect(response).toSatisfyApiSpec();
  });

  test("WHEN there are no products THEN return status 200 and an empty array", async () => {
    const totalProducts = await productRepository.getProducts();
    const defaultLimit = 10;
    const expectedResponseData = {
      products: [],
      currentPage: 1000,
      itemsPerPage: defaultLimit,
      totalItems: totalProducts.length,
      totalPages: Math.ceil(parseInt(totalProducts.length) / defaultLimit),
    };

    const response = await request(app)
      .get(`/api/products?page=1000`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseData);
    expect(response).toSatisfyApiSpec();
  });

  describe("WHEN the client sends a request for a specific number of products", () => {
    test("WHEN the limit query parameter is valid as per the API spec THEN return status 200 and an array of products", async () => {
      const totalProducts = await productRepository.getProducts();
      const expectedResponseData = {
        products: await productRepository.getPagedProducts(1, 10),
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: totalProducts.length,
        totalPages: Math.ceil(parseInt(totalProducts.length) / 10),
      };

      const response = await request(app)
        .get(`/api/products?limit=10`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponseData);
      expect(response).toSatisfyApiSpec();
    });

    test("WHEN the limit query parameter is not valid as per the API spec THEN return status 400 and an appropriate error message", async () => {
      const response = await request(app)
        .get("/api/products?limit=a")
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"limit" must be a number');
      expect(response).toSatisfyApiSpec();
    });
  });

  describe("WHEN the client sends a request for a specific page of products", () => {
    test("WHEN the page query parameter is valid as per the API spec THEN return 200 status code and an array of products", async () => {
      const totalProducts = await productRepository.getProducts();
      const expectedResponseData = {
        products: await productRepository.getPagedProducts(1, 10),
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: totalProducts.length,
        totalPages: Math.ceil(parseInt(totalProducts.length) / 10),
      };

      const response = await request(app)
        .get("/api/products?page=1")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponseData);
      expect(response).toSatisfyApiSpec();
    });

    test("WHEN the page query parameter is not valid as per the API spec THEN return status 400 and an appropriate error message", async () => {
      const response = await request(app)
        .get("/api/products?page=a")
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"page" must be a number');
      expect(response).toSatisfyApiSpec();
    });
  });
});
