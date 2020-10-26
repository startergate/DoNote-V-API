export const randomString = (length: number) => {
  const character =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomStr = "";
  let loopNum = length;
  while (loopNum) {
    randomStr += character[Math.floor(Math.random() * character.length)];
    loopNum -= 1;
  }

  return randomStr;
};
