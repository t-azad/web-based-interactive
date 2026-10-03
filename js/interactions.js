document.addEventListener("DOMContentLoaded", () => {
    buildCountryTable();
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
