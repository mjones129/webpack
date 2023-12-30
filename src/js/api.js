export function getPics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockedResponse = [
        "images/random/1.webp",
        "images/random/2.webp",
        "images/random/3.webp",
      ];
      resolve(mockedResponse);
    }, 700);
  });
}
