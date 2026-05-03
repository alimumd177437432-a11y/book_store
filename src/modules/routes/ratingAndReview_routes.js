import { Router } from "express";
import { authentication } from "../../middelwares/auth_middelware.js";
import { addReview, deleteReview, getAllReviewsForBook, updateReview } from "../controler/ratingAndReview_controler.js";
import { reviewMiddelware } from "../middelwares/ratingandreview_middelware.js";

const ratingRouter = Router();


ratingRouter.post("/", authentication, addReview);
ratingRouter.get("/:bookId", authentication, getAllReviewsForBook);
ratingRouter.delete("/:id", authentication, reviewMiddelware,deleteReview);
ratingRouter.put("/:id", authentication, reviewMiddelware,updateReview);

export { ratingRouter };