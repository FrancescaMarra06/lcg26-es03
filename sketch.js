let data;
let maxMortality = 0;
let totalDuration = 0;
let continents = [];
let colorScale = {
  'europe': 'red',
  'asia': 'blue',
  'africa': 'green',
  'america': 'coral',
}

function preload() {
  data = loadTable("assets/famines.csv", ",", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Partiamo dalla prima riga e leggiamo i valori usando i nomi delle colonne.
  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    // getNum restituisce numeri: con get() si ottengono stringhe e la somma
    // delle durate finirebbe per concatenarle.
    let duration = data.getNum(rowNumber, "duration");
    let mortality = data.getNum(rowNumber, "Excess Mortality midpoint");

    // Aggiorniamo il massimo solo quando troviamo una carestia peggiore
    if (mortality > maxMortality) {
      maxMortality = mortality;
    }

    // A ogni riga aggiungiamo la durata al totale.
    totalDuration += duration;

    // Leggiamo il continente di ogni riga e lo aggiungiamo solo se non c'è già.
    let continent = data.getString(rowNumber, "continent");

    if (!continents.includes(continent)) {
      continents.push(continent);
    }
  }
}

function draw() {
  background(245);

  let xPos = 0;
  let label = "";
  noStroke();

  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    let currentMortality = data.getNum(rowNumber, "Excess Mortality midpoint");
    let currentDuration = data.getNum(rowNumber, "duration");
    let continent = data.getString(rowNumber, "continent");
    let country = data.getString(rowNumber, "Country");

    let scaledDuration = map(currentDuration, 0, totalDuration, 0, windowWidth);
    let scaledMortality = map(currentMortality, 0, maxMortality, 0, windowHeight);

    fill(colorScale[continent]);
    rect(xPos, 0, scaledDuration, scaledMortality);

    if (
      mouseX >= xPos &&
      mouseX <= xPos + scaledDuration &&
      mouseY >= 0 &&
      mouseY <= scaledMortality
    ) {
      label = country;
    }

    xPos += scaledDuration;

  }

  if (label != "") {
    fill(0);
    text(label, mouseX + 8, mouseY + 16);
  }

}
