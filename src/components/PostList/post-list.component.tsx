import React from "react";
import styles from "./post-list.module.scss";

interface IPost {
  id: number;
  title: string;
  body: string;
}

interface IPostListProps {
  posts: IPost[];
  limit?: number;
  setLimit?: (value: number) => void;
}

const PostList: React.FC<IPostListProps> = ({ posts, limit, setLimit }) => {
  if (!posts.length) {
    return <h1>No posts found</h1>;
  }

  return (
    <div className={styles["post"]}>
      {posts.map((post, index) => (
        <div className={styles["post-content"]}>
          <strong className={styles["post-content-title"]}>
            {post.id}. {post.title}
          </strong>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
