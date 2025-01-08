export const getHeroImagePath = (heroName, size = 'small') => {
  if (!heroName) return '';

  const filename = heroName.replace(/\s+/g, '_');
  const base = import.meta.env.BASE_URL;
  return `${base}heroes/original/${filename}.png`;
};
