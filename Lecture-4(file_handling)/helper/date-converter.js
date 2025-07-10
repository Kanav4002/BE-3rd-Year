function formatDate(date) {
  let formatedDate = new Date().toISOString();
  return formatedDate;
}

function dateConverter(date) {
  let newDate = new Date().toLocaleTimeString();
  return newDate;
}

// module.exports = formatDate // when 1 function or vairable returns
module.exports = { formatDate, dateConverter }; // multiple function and variable returns
// and variable returns
