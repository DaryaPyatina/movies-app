export const genresFormater = (arr) => {
  if (arr.length > 2) {
    return [
      arr[0],
      arr[1],
      {
        id: 123456787654321,
        name: `+${arr.length - 2}`,
      },
    ];
  }

  return arr;
};

export const minify = (text, length) => {
  return text.slice(0, text.indexOf(" ", length)) + "...";
};
