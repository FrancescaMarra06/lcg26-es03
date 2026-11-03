let data;

let selezionata="1";

async function setup(){
    data = await loadTable("assets/famines.csv", ",","headers");

    console.log('dati:',data)

    createCanvas(windowWidth, windowHeight);

    let parametri =getURLParams();
    selezionata =parametri.femine_id;
}

function draw(){

    background('silver')
    let rigaSelezionata= data.findRow(selezionata, "famine_id");
    let nomePaese= rigaSelezionata.getString("Country");
    let mortalita=rigaSelezionata.getNum("Excess Mortality midpoint");
    let mortalitaMax=rigaSelezionata.getNum("Excess Mortality upper");

    text(nomePaese,20,30);
    text(mortalita,20,50);
    text(mortalitaMax,20,70);
   
}