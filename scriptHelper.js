
require('isomorphic-fetch');

    function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
        let missionTarget = document.getElementById('missionTarget');
        missionTarget.innerHTML = `
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name}</li>
                        <li>Diameter: ${diameter} </li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                    </ol>
                    <img src='${imageUrl}'>
                    `
    }
   
    // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`
    } else {
        return 'Not a Number'
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    if (validateInput(pilot) === `Empty`|| validateInput(copilot) === `Empty`|| 
    validateInput(fuelLevel) === `Empty`||validateInput(cargoLevel) === `Empty`) {
        alert(`All fields are required`);
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert(`Please enter a valid number for the Fuel Level and/or Cargo Mass field(s)`);
    } else if (validateInput(pilot)===`Is a Number`||validateInput(copilot)===`Is a Number`) {
        alert('Please do not enter a number for the Pilot and/or Co-Pilot field(s)');
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "hidden";
    }

    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = "There is not enough fuel for the journey";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)";
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)";
    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "There is enough fuel for the journey";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle is Ready for launch";
        launchStatus.style.color = "green";
    }





    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
     
    } else if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number") {
        alert("Please enter a valid name into the Pilot and/or Copilot field(s)");
    
    } else if (validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
        alert("Please enter a valid number into the Fuel Level and/or Cargo Mass field(s)");
   
    }



}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let i = Math.floor(Math.random() * planets.length);
    return planets[i];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

