import express from "express"
import { deleteproducts, getproducts, postproducts, putproducts } from "../controllers/product.control.js";

const router=express.Router();
router.get("/",getproducts)
  router.post("/",postproducts)
  router.put("/",putproducts)
  router.delete("/",deleteproducts)
export default router;