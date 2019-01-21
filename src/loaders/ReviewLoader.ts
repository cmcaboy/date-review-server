import * as DataLoader from "dataloader";
import { Review } from "../entities/Review";

type BatchReview = (ids: string[]) => Promise<Review[]>;
const batchReviews: BatchReview = async ids => {
  const reviews = await Review.findByIds(ids);

  const reviewMap: { [key: string]: Review } = {};
  reviews.forEach(u => {
    reviewMap[u.id] = u;
  });

  return ids.map(id => reviewMap[id]);
};

export const reviewLoader = () => new DataLoader<string, Review>(batchReviews);
