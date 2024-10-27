export function getIdFromURL() {
  const hash = window.location.hash;
  const pathSegments = hash.split('/');
  const id = pathSegments[pathSegments.length - 1];
  return id;
}

export function updateURL(id: string) {
  // Update the hash URL without reloading the page
  window.location.hash = `#/photos/${id}`;
}
