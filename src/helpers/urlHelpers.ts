export function getIdFromURL() {
  const pathSegments = window.location.pathname.split('/')
  const id = pathSegments[pathSegments.length - 1]
  return id
}

export function updateURL(id: string) {
  // Update the URL without reloading the page
  window.history.replaceState(null, '', `/photos/${id}`)
}
