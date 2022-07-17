# Lazy Days Spa Client

### A React client for the "Lazy Days Spa" app in the Udemy course "React Query: Server State Management for React"

## Installing

Run `npm install`

## Starting the client

Run `npm start`. The app will be found at [http://localhost:3000]. You will probably want to make sure the server is running as well.

//important summary:

1. the data will be refetched if staleTime = 0 or:
   component remount;
   window refocus;
   running refetch function manually;
   automated refetch;

2. pre-populating data options:
   pre-fetch;
   setQueryData;
   placeholderData;
   initialData;

3. {keepPreviousData: true} can be used instead of pre-fetch (content won't be empty during next fetching, it will work like cached prefetched data for content), BUT it's usefull if background doesn't change (like for lorem app...)
