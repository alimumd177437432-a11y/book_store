import { model } from "mongoose";

export const filterMiddleware = (fieldName, paramName) => {
  return (req, res, next) => {
    req.Query = req.Query.where({ [fieldName]: req.params[paramName] });
    next();
  };
};

export const selectMiddelware = (fields) => {
  return (req, res, next) => {
    req.Query = req.Query.select(fields);
    next();
  };
};
export const paginationMiddelware = () => {
  return async (req, res, next) => {
    const { page, limit,sort } = req.query;
    let currentPage = Math.max(1, parseInt(page) || 1);
    let perPage = Math.max(1, parseInt(limit) || 10);
    let skipValue = (currentPage - 1) * perPage;
    const modelToken = req.Query.model;
    const totalRows = await modelToken.countDocuments();
    const NumOfPages = Math.ceil(totalRows / perPage);
    const hasNext = currentPage < NumOfPages;
    const hasprev = currentPage > 1;
    const sortBy = sort || "-createdAt _id";
    req.Query = req.Query.sort(sortBy).skip(skipValue).limit(perPage);
    req.meta = {
      hasNext,
      hasprev,
      currentPage,
      NumOfPages,
      totalRows,
      limit,
      page: perPage,
    };
    if (currentPage > NumOfPages && totalRows > 0) {
      return res.status(404).json({
        message: "This page does not exist",
        meta: req.meta,
      });
    }
    next();
  };
};
