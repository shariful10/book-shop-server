import { Response } from "express";

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  message?: string;
  meta?: TMeta;
  data: T;
  accessToken?: string | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data?.message,
    meta: data.meta,
    data: data?.data,
    accessToken: data.accessToken,
  });
};

export default sendResponse;
