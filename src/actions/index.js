import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  let uniqueIds = new Set();
  for (let post of getState().posts) {
    if(!uniqueIds.has(post.userId)) uniqueIds.add(post.userId);
  }
  uniqueIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
      type: 'FETCH_POSTS',
      payload: response.data
    });
  };
};

export const fetchUser = (id) => {
  return async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
      type: 'FETCH_USER',
      payload: response.data
    });
  };
};