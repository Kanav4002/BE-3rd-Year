const filters = document.getElementById("filters");

filters.addEventListener("click", (e) => {
  const btnId = e.target.id;
  const allBtns = filters.children;
  if (btnId == "all") {
    e.target.className = "active";
    allBtns[1].className = "";
    allBtns[2].className = "";
  }
  else if (btnId == "active") {
    e.target.className = "active";
    allBtns[0].className = "";
    allBtns[2].className = "";
  }
  else if (btnId == "completed") {
    e.target.className = "active";
    allBtns[0].className = "";
    allBtns[1].className = "";
  }
})