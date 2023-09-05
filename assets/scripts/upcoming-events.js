getEventsData().then(response => {
    let upcomingEvents=[];
    const currentDate = new Date(data.currentDate);
    
    for (let event of data.events) {  
    const eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            upcomingEvents.push(event);
    
        }
    }
    loadEventsContent(upcomingEvents);})