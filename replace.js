function convertInches(match, p1, p2, offset, string) {
  return 'gonna replace >>' + match + '<<'
}

function convertToMetric(text) {
  return text.replace(/\b((?:(\d+)FT+\.?\b\.?)|(?:(\d+)'+?)\B)/gi, convertInches)
}

function recursivelyInvoke(el, fn) {
  ;[...el.childNodes]
    .filter(child => child.nodeName === '#text')
    .forEach(child => child.textContent = fn(child.textContent))

  ;[...el.childNodes]
    .filter(child => child.nodeName !== '#text')
    .filter(child => !['script', 'style']
      .includes(child.nodeName.toLowerCase()))
    .filter(child => child.textContent.trim() !== '')
    .forEach(child => recursivelyInvoke(child, fn))
}

recursivelyInvoke(document.body, convertToMetric)
