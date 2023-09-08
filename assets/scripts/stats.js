getEventsData().then(response => {
    const currentDate = new Date(data.currentDate);
    let highestContainer = document.getElementById('highestStatistics');
    let upcomingContainer = document.getElementById('upcomingStatistics');
    let pastContainer = document.getElementById('pastStatistics');

    
    setHighestStatistics();
    setUpcomingStatistics();
    setPastStatistics(); 
   
    function setHighestStatistics(){
        let highestRow = "";
        let highestAssistance = getHighestAssistance(events);
        let lowestAssistance = getLowestAssistance(events);
        let largestCapacity = getLargestCapacity(events);
        
        for(let i = 0; i < 3; i++){
            highestRow+= `
            <tr>
                <td>${highestAssistance.name}</td>
                <td>${lowestAssistance.name}</td>
                <td>${largestCapacity.name}</td>
            </tr>` 
        } console.log(events);

        highestContainer.innerHTML = highestRow;
    }

    function getHighestAssistance(){
        return events.reduce((highest, current) =>{
            if(highest.assistance > current.assistance){
                return highest;
            } else{
                return current;
            }
        })
    }

    function getLowestAssistance(){
        return events.reduce((lowest, current) =>{
            if(lowest.assistance < current.assistance){
                return lowest;
            } else{
                return current;
            }
        })
    }

    function getLargestCapacity(){
        return events.reduce((highest, current) =>{
            if(highest.capacity < current.capacity){
                return highest;
            } else{
                return current;
            }
        })
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