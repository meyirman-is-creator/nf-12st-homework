import React from "react";
import { useFetch } from '../hooks/fetch';

function PostsComponent() {
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <button onClick={refetch}>Reload Posts</button>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostsComponent;
