function convertFeet(match, p1, p2, offset, string) {
  const imperialValue = p2 ? parseInt(p2) : parseInt(p1);
  const conversionRate = 0.3048;
  return `${imperialValue * conversionRate} M`
}

function convertToMetric(text) {
  return text.replace(/\b((?:(\d+)FT+\.?\b\.?)|(?:(\d+)'(?:-\d+)?))/gi, convertFeet)
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
