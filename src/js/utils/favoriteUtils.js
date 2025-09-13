const FAVORITES_KEY = "favoriteBooks";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

export function isFavorite(id) {
  return getFavorites().includes(String(id));
}

export function addFavorite(id) {
  const favs = getFavorites();
  const strId = String(id);
  if (!favs.includes(strId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs, strId]));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(favId => favId !== String(id));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}