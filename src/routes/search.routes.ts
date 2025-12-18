import { Router } from "express";
import { searchByText } from "../controllers/search.text.controller";
import { saerchByImage } from "../controllers/search.image.controller";


const router = Router();

router.post("/text", searchByText);
router.post("/image", saerchByImage);

export default router;