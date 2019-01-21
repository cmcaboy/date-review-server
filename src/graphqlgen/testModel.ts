export interface Person {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  age: number | null;
  datetime: number | null;
  platformId: string;
}
export interface Review {
  id: string;
  title: string | null;
  description: string | null;
  rating: number | null;
  datetime: number | null;
  personId: string;
  authorId: string;
}
export interface Comment {
  id: string;
  text: string | null;
  authorId: string;
  reviewId: string;
}
export interface Photo {
  id: string;
  url: string | null;
  personId: string;
}
export interface Platform {
  id: string;
  name: string | null;
  description: string | null;
}
