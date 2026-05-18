import { Request, Response } from "express";
import { loginRegistry } from "../memory/loginregistery";
 export const requestCodecontroller(req:Request,res:Response)=>{
  try{

  }
  catch(error){
   res.status(501).json({message:"something went wrong"})
  }
 }