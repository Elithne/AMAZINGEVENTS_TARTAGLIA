getEventsData().then(response => {
    const currentDate = new Date(data.currentDate);
    let highestContainer = document.getElementById('highestStatistics');
    let upcomingContainer = document.getElementById('upcomingStatistics');
    let pastContainer = document.getElementById('pastStatistics');
    let pastEvents = []

    setHighestStatistics();
    setUpcomingStatistics();
    setPastStatistics(); 
   
    function setHighestStatistics(){
        let highestRow = "";

        for (let event of data.events) {  
            const eventDate = new Date(event.date);
                if (eventDate < currentDate) {
                    pastEvents.push(event);
            
                }
            }

        let highestAssistance = getHighestAssistance(pastEvents);
        let lowestAssistance = getLowestAssistance(pastEvents);
        let largestCapacity = getLargestCapacity(data.events);
        
        for(let i = 0; i < 3; i++){
            highestRow+= `
            <tr>
                <td>${highestAssistance[i].name}</td>
                <td>${lowestAssistance[i].name}</td>
                <td>${largestCapacity[i].name}</td>
            </tr>` 
        }

        highestContainer.innerHTML = highestRow;
    }

    function getHighestAssistance(pastEvents){   
        let orderedEvents = pastEvents;     
        orderedEvents.sort((a, b) => b.assistance - a.assistance);
        return orderedEvents.slice(0, 3); // Devuelve los primeros 3 eventos
    }

    function getLowestAssistance(pastEvents){
        let orderedEvents = pastEvents;     
        orderedEvents.sort((a, b) => a.assistance - b.assistance); // Ordenar en orden ascendente
        return orderedEvents.slice(0, 3);
    }

    function getLargestCapacity(events) {
        let orderedEvents = events; 
        orderedEvents.sort((a, b) => b.capacity - a.capacity);
        return orderedEvents.slice(0, 3); 
    }

    function setUpcomingStatistics() {
        
        let upcomingRow = "";
        categories.forEach(category => {
            let categoriesFiltered = events.filter(event => event.category === category);

            let totalRevenuePerCategory = 0;
            let totalAttendeesPerCategory = 0;
            let totalCapacityPerCategory = 0;

            categoriesFiltered.forEach(event => {
                const eventDate = new Date(event.date);
                if (eventDate > currentDate) {
                    totalRevenuePerCategory += (event.price * event.estimate); 
                    
                    totalAttendeesPerCategory += event.estimate;
                    totalCapacityPerCategory += event.capacity;
                }
            });
            
            let percentageOfAssistancePerCategory = getPercentageOfAssistancePerCategory(
                totalAttendeesPerCategory,
                totalCapacityPerCategory
            );

            upcomingRow += `
                <tr>
                    <td>${category}</td>
                    <td>$${totalRevenuePerCategory}</td>
                    <td>${percentageOfAssistancePerCategory}%</td>
                </tr>`;
        });

        upcomingContainer.innerHTML = upcomingRow;
    }
    
    function setPastStatistics(){
        let pastRow = "";
        categories.forEach(category => {
            let categoriesFiltered = events.filter(event => event.category === category);

            let totalRevenuePerCategory = 0;
            let totalAttendeesPerCategory = 0;
            let totalCapacityPerCategory = 0;

            categoriesFiltered.forEach(event => {
                const eventDate = new Date(event.date);
                if (eventDate < currentDate) {
                    totalRevenuePerCategory += (event.price * event.assistance);
                    totalAttendeesPerCategory += event.assistance;
                    totalCapacityPerCategory += event.capacity;
                }
            });


            let percentageOfAssistancePerCategory = getPercentageOfAssistancePerCategory(
                totalAttendeesPerCategory,
                totalCapacityPerCategory
            );

            pastRow += `
                <tr>
                    <td>${category}</td>
                    <td>$${totalRevenuePerCategory}</td>
                    <td>${percentageOfAssistancePerCategory}%</td>
                </tr>`;
        });


            pastContainer.innerHTML = pastRow;
    }
    
    function getPercentageOfAssistancePerCategory(totalAttendees, totalCapacity) {
        let percentage = totalAttendees * 100 / totalCapacity;
        if(percentage > 0){
            return Math.round(percentage);
        } else{
            return 0;
        }
        
    }

}); 