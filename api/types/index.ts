import { Request } from "express";

export type SortOrder = 1 | -1;
export type SortBy = "createdAt" | "viewsCount";

export interface CreateUpdatePostBody {
  title: string;
  text: string;
  imageUrl?: string;
  tags: string;
}

export interface CustomRequest extends Request {
  userId?: string;
}
