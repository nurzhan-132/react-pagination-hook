import React, { useEffect, useState } from "react";
import styles from "./posts.module.scss";
import { IPost } from "../../types/types";
import PostService from "../../api/PostService";
import { useFetching } from "../../hooks/useFetching";
import Pagination from "../Pagintaion/pagination.component";
import PostList from "../PostList/post-list.component";
import Skeleton from "../Skeleton/skeleton.component";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  const { fetching, isLoading, error } = useFetching(
    async (limit: number, page: number) => {
      const response = await PostService.getAllPosts(limit, page);
      setPosts(response.data);
      const totalCount = Number(response.headers["x-total-count"]);
      setTotalPages(Math.ceil(totalCount / limit));
      console.log(totalCount);
    },
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetching(limit, currentPage);
  }, [currentPage]);

  return (
    <div className={styles["posts"]}>
      <h1>Posts</h1>
      {/*   // TODO: Можно было бы добавить логику:
              - лимита постов на одну страницу,
              - количество страниц, на которые можно прыгнуть Jump
              Однако, в интересах времени я не реализовал эту функцию в данной версии.
              Если есть необходимость, я готов обсудить возможные решения или доработать данный момент в будущем.
      */}
      {isLoading ? (
        <Skeleton count={limit} height="94px" />
      ) : (
        <PostList posts={posts} />
      )}
      {error && <p>Error: {error}</p>}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        mode="cyclic"
      />

      {/*<Pagination*/}
      {/*  totalPages={totalPages}*/}
      {/*  currentPage={currentPage}*/}
      {/*  onPageChange={handlePageChange}*/}
      {/*  mode="regular"*/}
      {/*/>*/}
    </div>
  );
};

export default Posts;
