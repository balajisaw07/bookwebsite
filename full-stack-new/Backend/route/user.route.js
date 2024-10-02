import express from "express";
import { signup, login, addWish, getWish, deleteWish } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/wishlist/:id", addWish);
router.get('/:id/wish', getWish);
router.delete('/wish/:id', deleteWish);
export default router;