window.addEventListener("load", function () {
  let table = document.getElementById("table");
  for (let ri = 0; ri < 8; ri++) {
    let rows = document.createElement("tr");
    let fragment = document.createDocumentFragment();
    let white = ri % 2 == 0 ? true : false;
    for (let ci = 0; ci < 8; ci++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", `box ${white === true ? "white" : "black"}`);
      cell.setAttribute("data-index", `${ri}-${ci}`);
      //   cell.textContent = `${ri}-${ci}`;
      rows.appendChild(cell);
      white = !white;
    }
    fragment.appendChild(rows);
    table.appendChild(fragment);
  }
  let boxesArr = document.getElementsByClassName("box");
  table.addEventListener("mouseover", function (e) {
    let pathStorage = {};
    let dataIndex = e.target.dataset.index;
    let [ri, ci] = e.target.dataset.index.split("-");
    pathStorage[dataIndex] = true;
    for (let i = 0; i < boxesArr.length; i++) {
      boxesArr[i].classList.remove("yellow");
    }
    findTopLeft(ri, ci, pathStorage);
    findTopRight(ri, ci, pathStorage);
    findBottomLeft(ri, ci, pathStorage);
    findBottomRight(ri, ci, pathStorage);

    for (let i = 0; i < boxesArr.length; i++) {
      let currIndex = boxesArr[i].dataset.index;
      if (pathStorage[currIndex] == true) {
        boxesArr[i].classList.add("yellow");
      }
    }
  });
  table.addEventListener("mouseleave", function (e) {
    for (let i = 0; i < boxesArr.length; i++) {
      boxesArr[i].classList.remove("yellow");
    }
  });

  function findTopLeft(ri, ci, pathStorage) {
    ri--;
    ci--;
    while (ri >= 0 && ci >= 0) {
      let dataIndex = `${ri}-${ci}`;
      pathStorage[dataIndex] = true;
      ri--;
      ci--;
    }
  }

  function findTopRight(ri, ci, pathStorage) {
    ri--;
    ci++;
    while (ri >= 0 && ci <= 7) {
      let dataIndex = `${ri}-${ci}`;
      pathStorage[dataIndex] = true;
      ri--;
      ci++;
    }
  }
  function findBottomRight(ri, ci, pathStorage) {
    ri++;
    ci++;
    while (ri <= 7 && ci <= 7) {
      let dataIndex = `${ri}-${ci}`;
      pathStorage[dataIndex] = true;
      ri++;
      ci++;
    }
  }

  function findBottomLeft(ri, ci, pathStorage) {
    ri++;
    ci--;
    while (ri <= 7 && ci >= 0) {
      let dataIndex = `${ri}-${ci}`;
      pathStorage[dataIndex] = true;
      ri++;
      ci--;
    }
  }
});
