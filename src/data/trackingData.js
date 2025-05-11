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
      location: "London Heathrow",
      code: "LHR",
      country: "UK"
    },
    arrival: {
      date: "Fri, Apr. 11, 2025",
      time: "9:30 AM",
      location: "Moi International",
      code: "KE",
      country: "Kenya East Africa"
    },
    layover: "15 hrs layover in Kenya",
    sender: {
      name: "Anna Luisa",
      phone: "+44 780680242"
    },
    receiver: {
      name: "Aine Rita Banda",
      phone: "+256745847526"
    },
    items: "DOLLARS",
    status: {
      departed: true,
      inTransit: true,
      arrived: true
    },
    estimatedDelivery: "Delivered",
    lastUpdate: "May 10, 2025"
  }
};

export const allTrackingDetails = validTrackingNumbers.reduce((acc, number) => {
  acc[number] = {
    ...trackingDetails["AA/GOA1UO"],
    confirmationNumber: number,
    status: {
      departed: true,
      inTransit: number !== "AA/GOA9UO",
      arrived: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number)
    },
    estimatedDelivery: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number)
      ? "Delivered"
      : number !== "AA/GOA9UO"
        ? "Expected Apr 12, 2025"
        : "Expected Apr 13, 2025",
    lastUpdate: ["AA/GOA1UO", "AA/GOA2UO", "AA/GOA3UO", "AA/GOA5UO"].includes(number)
      ? "May 10, 2025 at 9:30 AM"
      : number !== "AA/GOA9UO"
        ? "May 10, 2025 at 7:45 PM"
        : "May 10, 2025 at 5:15 PM"
  };
  return acc;
}, {});
