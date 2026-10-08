document.addEventListener("DOMContentLoaded", () => {
    buildCountryTable();

    const tableBody = document.getElementById("country-table-body");

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
});

function buildCountryTable() {
    const tableBody = document.getElementById("country-table-body");

    countries.forEach((country) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${country.country}</td>

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
