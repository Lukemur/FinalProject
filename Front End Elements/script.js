let chart;
let dataPoints = [];

function addData() {
  const titleInput = document.getElementById("title");
  const moneyInput = document.getElementById("money");

  const title = titleInput.value;
  const money = parseFloat(moneyInput.value);

  if (title !== "" && !isNaN(money) && money > 0) {
    dataPoints.push({ title, money });
    titleInput.value = "";
    moneyInput.value = "";
    renderChart();
    renderDataList();
  }
}

function removeData(index) {
  dataPoints.splice(index, 1);
  renderChart();
  renderDataList();
}

function renderChart() {
  if (chart) {
    chart.destroy();
  }

  const series = dataPoints.map((point) => point.money);
  const labels = dataPoints.map((point) => point.title);

  chart = new ApexCharts(document.querySelector("#chartContainer"), {
    series: series,
    chart: {
      type: "pie"
    },
    labels: labels
  });

  chart.render();
}

function renderDataList() {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "";

  dataPoints.forEach((point, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${point.title}: $${point.money.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeData(index));

    listItem.appendChild(removeButton);
    dataList.appendChild(listItem);
  });
}
