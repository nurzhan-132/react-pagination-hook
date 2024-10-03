import axios, { AxiosResponse } from "axios";
import { IPost } from "../types/types";

export default class PostService {
  static async getAllPosts(
    limit: number = 10,
    page: number = 1,
  ): Promise<AxiosResponse<IPost[]>> {
    const response = await axios.get<IPost[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      },
    );
    return response;
  }
}
