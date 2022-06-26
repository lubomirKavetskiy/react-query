import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { PostDetail } from './PostDetail';
const maxPostPage = 10;
const CACHE_TIME = 5000;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, error, isLoading } = useQuery(
    ['posts', currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 100000,

      //if data haven't fetched yet instead of Loading... will be shown the previous data
      //click one-by-one on the next page and if the responce is still pending - won't shown Loading...
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery(
        ['posts', nextPage],
        () => fetchPosts(nextPage),
        { cacheTime: 2000 }
      );
    }
  }, [currentPage, queryClient]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.toString()}</p>;

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
