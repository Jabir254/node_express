const fortuneCookies = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

module.exports = getFortune = () => {
  const idx = Math.floor(Math.random() * fortuneCookies.length);
  console.log(fortuneCookies);
  return fortuneCookies[idx];
};
