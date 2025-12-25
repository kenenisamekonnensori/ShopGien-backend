import { Router } from "express";
import searchRoutes from "./search.routes";
import authRoutes from "./auth.routh";

const router = Router();

router.use("/search", searchRoutes);
router.use("/auth", authRoutes);

export default router;