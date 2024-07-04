const jsonData = [
  {
    id: 1,
    name: "foo",
    city: "dallas",
    category: "one",
    type: "A",
    active: "FALSE",
  },
  {
    id: 2,
    name: "bar",
    city: "dallas",
    category: "one",
    type: "B",
    active: "FALSE",
  },
  {
    id: 3,
    name: "jim",
    city: "san francisco",
    category: "one",
    type: "B",
    active: "TRUE",
  },
  {
    id: 4,
    name: "jane",
    city: "denver",
    category: "two",
    type: "C",
    active: "FALSE",
  },
];

function initializeTable(data) {
  const tableHeaders = Object.keys(data[0]);
  const tableHeadersRow = document.getElementById("table-headers");

  tableHeadersRow.innerHTML = "";

  tableHeaders.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    tableHeadersRow.appendChild(th);
  });

  updateTable(data);

  initializeFilters(data, tableHeaders);
}

function updateTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    Object.keys(item).forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = item[key];
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

function initializeFilters(data, keys) {
  const filtersContainer = document.getElementById("filters");
  filtersContainer.innerHTML = "";

  keys.forEach((key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    const filterLabel = document.createElement("label");
    filterLabel.textContent = `Filter by ${key}: `;
    const filterSelect = document.createElement("select");
    filterSelect.id = `filter-${key}`;

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = `Select ${key}`;
    filterSelect.appendChild(defaultOption);

    uniqueValues.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      filterSelect.appendChild(option);
    });

    filtersContainer.appendChild(filterLabel);
    filtersContainer.appendChild(filterSelect);
    filtersContainer.appendChild(document.createElement("br"));
  });
}

function getSelectedFilters(keys) {
  const filters = {};
  keys.forEach((key) => {
    const selectedValue = document.getElementById(`filter-${key}`).value;
    if (selectedValue) {
      filters[key] = selectedValue;
    }
  });
  return filters;
}

function filterData(filters) {
  const filteredData = jsonData.filter((item) => {
    return Object.keys(filters).every((key) => {
      return String(item[key]).toLowerCase() === filters[key].toLowerCase();
    });
  });

  updateTable(filteredData);
}

document.getElementById("filterButton").addEventListener("click", function () {
  const tableHeaders = Object.keys(jsonData[0]);
  const filters = getSelectedFilters(tableHeaders);
  filterData(filters);
});

function clearFilters() {
  initializeTable(jsonData);
}

initializeTable(jsonData);
