import { ServiceResponseInterface } from "../../services/protocols/ServiceResponseInterface";
import { Response } from "express";
export interface ResponseData {
  statusCode: number;
  body: any;
}

export const makeResponse = (response: Response, data:ServiceResponseInterface ) => {
  const responseData:ResponseData = data.isSuccess? {statusCode: 200, body: data.data} : {statusCode: data.error.code, body: data.error}  
  return response.status(responseData.statusCode).json(responseData.body)
}
