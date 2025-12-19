import { Router } from "express";
import searchRoutes from "./search.routes";

const router = Router();

router.use("/search", searchRoutes);

export default router;