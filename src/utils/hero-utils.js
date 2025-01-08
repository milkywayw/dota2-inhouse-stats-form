export const getHeroImagePath = (heroName, size = 'small') => {
  if (!heroName) return '';

  // Convert hero name to filename format
  const filename = heroName.replace(/\s+/g, '_');
  return `/src/assets/heroes/${size}/${filename}.png`;
};
