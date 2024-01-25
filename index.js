function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let barColors = "rgba(52, 202, 165, 0.10)";

var data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      backgroundColor: barColors,
      borderWidth: 1,
      borderRadius: 60,
      label: "sales",
      data: [
        7000, 20500, 6000, 28000, 9000, 45000, 9000, 23000, 32000, 4000, 30000,
        21000, 50000,
      ],
    },
  ],
};

var options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        // color: "rgba(255,99,132,0.2)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

new Chart("chart", {
  type: "bar",
  options: options,
  data: data,
});

// Fetch file-data from the JSON file
fetch("./data/file.json")
  .then((response) => response.json())
  .then((data) => {
    // Function to create a file card element
    function createFileCard(item) {
      const fileCard = document.createElement("div");
      fileCard.className = "file-card";
      fileCard.innerHTML = `
            <hr />
            <div class="profile-content">
                <div class="name-item">
                    <img src="${item.image}" alt="dummy" />
                    <p>${item.name}</p>
                </div>
                <p>${item.date}</p>
                <p>${item.amount}</p>
                <p class="${item.status.toLowerCase()}">${item.status}</p>
                <div class="view-invoice">
                    <img src="./assets/images/view.png" alt="view" />
                    <p>View</p>
                </div>
            </div>
        `;
      return fileCard;
    }

    // Get the container to append file cards
    const fileTableContent = document.getElementById("fileTableContent");

    // Iterate through the data and create file cards
    data.forEach((item) => {
      const fileCard = createFileCard(item);
      fileTableContent.appendChild(fileCard);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Fetch Platform data from the JSON file
fetch("data/platform.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the container where sales content will be added
    const salesContainer = document.getElementById("salesContainer");

    // Loop through the data and create HTML elements
    data.forEach((sale) => {
      const salesContent = document.createElement("div");
      salesContent.className = "sales-content";
      salesContent.classList.add(sale.title.toLowerCase().replace(/\s/g, ""));

      salesContent.innerHTML = `
                    <p>${sale.title}</p>
                    <progress id="progress" value="${sale["progress-value"]}" max="100">${sale["progress-value"]}%</progress>
                    <div>
                        <p>${sale.amount}</p>
                        <p>${sale.percent}</p>
                    </div>
                `;

      // Append the created sales content to the container
      salesContainer.appendChild(salesContent);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Fetch summary  data
fetch("./data/summary.json")
  .then((response) => response.json())
  .then((data) => {
    // Update summary cards with JSON data
    const summaryContainer = document.getElementById("summary-container");

    data.forEach((cardData) => {
      const summaryCard = document.createElement("div");
      summaryCard.classList.add("summary-card");

      // Image div
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-div");

      const iconImage = document.createElement("img");
      iconImage.src = cardData.icon;
      iconImage.alt = "icon";
      imageDiv.appendChild(iconImage);

      const graphImage = document.createElement("img");
      graphImage.src = cardData["graph-image"];
      graphImage.alt = "graph";
      imageDiv.appendChild(graphImage);

      summaryCard.appendChild(imageDiv);

      // Text content
      const textContent = document.createElement("div");
      textContent.classList.add("text-content");

      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = cardData.title;
      textContent.appendChild(titleParagraph);

      const amountParagraph = document.createElement("p");
      amountParagraph.textContent = cardData.amount;
      textContent.appendChild(amountParagraph);

      summaryCard.appendChild(textContent);

      // Percentage div
      const percentageDiv = document.createElement("div");
      percentageDiv.classList.add("percentage-div");

      const trendingDiv = document.createElement("div");
      trendingDiv.classList.add(
        cardData["trending-up"] ? "trending-up" : "trending-down"
      );

      const trendingImage = document.createElement("img");
      trendingImage.src = cardData["trending-up"] || cardData["trending-down"];
      trendingImage.alt = "trending";

      const percentParagraph = document.createElement("p");
      percentParagraph.textContent = cardData.percent;

      trendingDiv.appendChild(trendingImage);
      trendingDiv.appendChild(percentParagraph);

      percentageDiv.appendChild(trendingDiv);

      const monthParagraph = document.createElement("p");
      monthParagraph.classList.add("previous-text");
      monthParagraph.textContent = cardData.month;

      percentageDiv.appendChild(monthParagraph);

      summaryCard.appendChild(percentageDiv);

      // Append the populated summary card to the container
      summaryContainer.appendChild(summaryCard);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
