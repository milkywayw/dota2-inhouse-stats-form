export const getHeroImagePath = (heroName) => {
  if (!heroName) return '';

  const filename = heroName.replace(/\s+/g, '_').toLowerCase();
  const base = import.meta.env.BASE_URL;
  return `${base}heroes/original/${filename}.png`;
};
