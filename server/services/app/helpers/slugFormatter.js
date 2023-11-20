function slugFormatter(movieTitle) {
  return movieTitle
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "") 
    .replace(/--+/g, "-") 
    .trim();
}

module.exports = slugFormatter;
