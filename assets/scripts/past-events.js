let cardsContainer = document.getElementById('cardsContainer');
let upcomingEvents=[];
const currentDate = data.currentDate;

for (let event of data.events) {
const eventDate = (event.date);
    if (eventDate < currentDate) {
        upcomingEvents.push(event);
        console.log(eventDate);

    }
}

createCards(upcomingEvents, "cardsContainer");