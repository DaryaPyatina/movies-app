export const genresFormater = (arr) => {
  if (arr.length > 2) {
    return [
      arr[0],
      arr[1],
      {
        id: 123456787654321,
        name: `+${arr.length - 2}`,
      },
    ]
  }

  return arr
}

export const minify = (text, length) => {
  return text.slice(0, text.indexOf(' ', length)) + '...'
}

export const ratingColor = (number) => {
  if (number >= 0 && number < 3) {
    return '#E90000'
  }
  if (number >= 3 && number < 5) {
    return '#E97E00'
  }
  if (number >= 5 && number < 7) {
    return '#E9D100'
  }
  if (number >= 7) {
    return '#66E900'
  }
}
