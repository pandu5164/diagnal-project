export default getMovieList = async (obj) => {
  const {
    pageNum,
    callBacks: { onSuccess, onError },
  } = obj;
  fetch(`https://test.create.diagnal.com/data/page${pageNum}.json`)
    .then((response) => response.json())
    .then((resp) => {
      onSuccess(resp);
      return resp;
    })
    .catch((err) => {
      onError(err);
      return err;
    });
};
