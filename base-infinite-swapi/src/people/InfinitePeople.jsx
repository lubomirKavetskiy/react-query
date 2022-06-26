import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { Person } from './Person';

const INIT_URL = 'https://swapi.dev/api/people/';

const fetchUrl = async (url) => {
  const response = await fetch(url);

  return response.json();
};

export function InfinitePeople() {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = INIT_URL }) => {
      console.log({ pageParam });
      return fetchUrl(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log({ lastPage, allPages });
        return lastPage.next || undefined;
      },
    }
  );

  console.log({ data, fetchNextPage, hasNextPage });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data?.pages?.map((pageData) =>
          pageData.results.map(({ name, hair_color, eye_color }) => (
            <Person
              key={name}
              name={name}
              hairColor={hair_color}
              eyeColor={eye_color}
            />
          ))
        )}
      </InfiniteScroll>{' '}
    </>
  );
}
