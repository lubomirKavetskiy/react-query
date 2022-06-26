import { useMutation, useQuery } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isError, error, isLoading } = useQuery(
    ['comments', post?.id],
    () => fetchComments(post?.id),
    { staleTime: 100000 }
  );

  const deleteMutation = useMutation((postID) => deletePost(postID));
  const updateMutation = useMutation(() => updatePost(post?.id));

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.toString()}</p>;

  console.log({ data });

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isLoading && 'Loading...'}
      {deleteMutation.isError && 'Error...'}
      {deleteMutation.isSuccess && 'Success...'}

      <button onClick={updateMutation.mutate}>Update title</button>
      {updateMutation.isLoading && 'Loading...'}
      {updateMutation.isError && 'Error...'}
      {updateMutation.isSuccess && 'Success...'}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
