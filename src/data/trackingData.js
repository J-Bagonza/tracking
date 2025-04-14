export const validTrackingNumbers = [
    "AA/GOA1UO",
    "AA/GOA2UO",
    "AA/GOA3UO",
    "AA/GOA4UO",
    "AA/GOA5UO",
    "AA/GOA6UO",
    "AA/GOA7UO",
    "AA/GOA8UO",
    "AA/GOA9UO",
    "AA/GOA0UO",
  ];
  
  export const trackingDetails = {
    "AA/GOA1UO": {
      confirmationNumber: "AA/GOA1UO",
      flightNumber: "5549",
      operator: "PSA AIRLINES AS AMERICAN EAGLE",
      departure: {
        date: "Thu, Apr. 10, 2025",
        time: "5:00 PM",
        location: "Chicago Midway International",
        code: "IL",
        country: "USA"
      },
      arrival: {
        date: "Fri, Apr. 11, 2025",
        time: "8:00 AM",
        location: "Moi International",
        code: "KE",
        country: "KENYA EAST AFRICA"
      },
      layover: "15 hrs layover in KENYA EAST AFRICA",
      sender: {
        name: "ANNA LUISA",
        phone: "+17752004597"
      },
      receiver: {
        name: "DOROTHY NAMAYANJA",
        phone: "+256756463027"
      },
      items: "PHONE, ACCESSORIES, DOLLARS",
      status: {
        departed: true,
        inTransit: true,
        arrived: true
      },
      estimatedDelivery: "Delivered",
      lastUpdate: "Apr 11, 2025 at 9:30 AM"
    }
  };
  
  // Clone the tracking details for all tracking numbers
  export const allTrackingDetails = validTrackingNumbers.reduce((acc, number) => {
    acc[number] = {
      ...trackingDetails["AA/GOA1UO"],
      confirmationNumber: number,
      // Slightly randomize the status for different tracking numbers
      status: {
        departed: true,
        inTransit: number !== "AA/GOA9UO",
        arrived: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number)
      },
      // Update estimated delivery based on status
      estimatedDelivery: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number) 
        ? "Delivered" 
        : number !== "AA/GOA9UO" 
          ? "Expected Apr 12, 2025" 
          : "Expected Apr 13, 2025",
      lastUpdate: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number)
        ? "Apr 11, 2025 at 9:30 AM"
        : number !== "AA/GOA9UO"
          ? "Apr 10, 2025 at 7:45 PM"
          : "Apr 10, 2025 at 5:15 PM"
    };
    return acc;
  }, {});