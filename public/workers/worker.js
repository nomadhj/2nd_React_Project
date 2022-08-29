onmessage = function (e) {
  const { id, author, url } = e.data;

  const convertedObject = {
    id: id,
    name: author,
    category: '프론트엔드 개발자',
    location: '서울',
    years: 2,
    like: false,
    url: url,
  };

  postMessage(convertedObject);
};
