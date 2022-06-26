import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { Species } from './Species';

const INIT_URL = 'https://swapi.dev/api/species/';

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = INIT_URL }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data?.pages?.map((pageData) =>
          pageData?.results?.map(({ name, language, average_lifespan }) => (
            <Species
              key={name}
              name={name}
              language={language}
              averageLifespan={average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
