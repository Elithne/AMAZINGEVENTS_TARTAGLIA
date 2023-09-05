getEventsData().then(response => {
    let pastEvents=[];
    const currentDate = new Date(data.currentDate);
    
    for (let event of data.events) {  
    const eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            pastEvents.push(event);
    
        }
    }
    loadEventsContent(pastEvents);})