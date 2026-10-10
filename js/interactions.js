document.addEventListener("DOMContentLoaded", () => {
    buildCountryTable();

    const tableBody = document.getElementById("country-table-body");
    const article = document.querySelector(".article-content");

    function highlightCountryMentions(country) {
        article.querySelectorAll("mark.country-highlight").forEach((mark) => {
            mark.replaceWith(document.createTextNode(mark.textContent));
        });

        const pattern = new RegExp(`\\b(${country})\\b`, "gi");
        const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let firstMatch = null;

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            const parts = node.textContent.split(pattern);
            if (parts.length === 1) return;

            const fragment = document.createDocumentFragment();
            parts.forEach((part, index) => {
                if (index % 2 === 0) {
                    fragment.append(part);
                } else {
                    const mark = document.createElement("mark");
                    mark.className = "highlight country-highlight";
                    mark.textContent = part;
                    fragment.append(mark);
                    firstMatch ??= mark;
                }
            });
            node.replaceWith(fragment);
        });

        return firstMatch;
    }

    tableBody.addEventListener("mouseover", (event) => {
        const tableValue = event.target.closest(
            "td[data-country][data-attribute]",
        );

        if (!tableValue) return;

        const country = tableValue.dataset.country;
        const attribute = tableValue.dataset.attribute;

        const matchingText = document.querySelector(
            `.article-content [data-country="${country}"][data-attribute="${attribute}"]`,
        );

        if (matchingText) {
            matchingText.classList.add("highlight");
        }
    });

    tableBody.addEventListener("mouseout", (event) => {
        const tableValue = event.target.closest(
            "td[data-country][data-attribute]",
        );

        if (!tableValue) return;

        const country = tableValue.dataset.country;
        const attribute = tableValue.dataset.attribute;

        const matchingText = document.querySelector(
            `.article-content [data-country="${country}"][data-attribute="${attribute}"]`,
        );

        if (matchingText) {
            matchingText.classList.remove("highlight");
        }
    });

    // focus function
    tableBody.addEventListener("click", (event) => {
        const cell = event.target.closest("td");
        if (!cell) return;

        if (cell.cellIndex === 0) {
            highlightCountryMentions(cell.dataset.country)?.scrollIntoView({
                block: "center",
            });
            return;
        }

        const tableValue = event.target.closest(
            "td[data-country][data-attribute]",
        );

        if (!tableValue) return;

        const { country, attribute } = tableValue.dataset;
        const matchingText = document.querySelector(
            `.article-content [data-country="${country}"][data-attribute="${attribute}"]`,
        );

        matchingText?.scrollIntoView({ block: "center", inline: "nearest" });
    });

    // Mark table cells that have a matching number in the article,
    // so readers can tell which cells will highlight something
    tableBody.querySelectorAll("td[data-country]").forEach((cell) => {
        const { country, attribute } = cell.dataset;
        const match = attribute
            ? article.querySelector(
                  `[data-country="${country}"][data-attribute="${attribute}"]`,
              )
            : article.textContent.includes(country);

        if (match) cell.classList.add("has-match");
    });

    // Reverse direction: hovering a number in the article
    // highlights its cell in the table
    function toggleTableCell(event, turnOn) {
        const textValue = event.target.closest(
            "[data-country][data-attribute]",
        );

        if (!textValue) return;

        const country = textValue.dataset.country;
        const attribute = textValue.dataset.attribute;

        const matchingCell = tableBody.querySelector(
            `td[data-country="${country}"][data-attribute="${attribute}"]`,
        );

        if (!matchingCell) return;

        matchingCell.classList.toggle("highlight", turnOn);

        if (turnOn) {
            // Scroll the table just enough to bring the cell into view
            matchingCell.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
    }

    article.addEventListener("mouseover", (event) =>
        toggleTableCell(event, true),
    );

    article.addEventListener("mouseout", (event) =>
        toggleTableCell(event, false),
    );
});

function buildCountryTable() {
    const tableBody = document.getElementById("country-table-body");

    countries.forEach((country) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td data-country="${country.country}">${country.country}</td>

            <td
                data-country="${country.country}"
                data-attribute="population">
                ${country.population}
            </td>

            <td
                data-country="${country.country}"
                data-attribute="land-area">
                ${country.landArea}
            </td>

            <td
                data-country="${country.country}"
                data-attribute="gdp">
                ${country.gdp}
            </td>

            <td
                data-country="${country.country}"
                data-attribute="co2">
                ${country.co2}
            </td>

            <td
                data-country="${country.country}"
                data-attribute="life-expectancy">
                ${country.lifeExpectancy}
            </td>

            <td
                data-country="${country.country}"
                data-attribute="birth-rate">
                ${country.birthRate}
            </td>
        `;

        tableBody.appendChild(row);
    });
}
