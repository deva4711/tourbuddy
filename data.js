const P = (name, wiki, country, continent, lat, lng, best, tip) =>
  ({ name, wiki, country, continent, lat, lng, best, tip });

const PLACES = [
  P("Taj Mahal", "Taj_Mahal", "India", "Asia", 27.1751, 78.0421, "Oct – Mar", "Go at sunrise for soft light and thinner crowds; closed on Fridays."),
  P("Great Wall of China", "Great_Wall_of_China", "China", "Asia", 40.4319, 116.5704, "Apr – May, Sep – Oct", "Choose Mutianyu or Jinshanling over crowded Badaling."),
  P("Angkor Wat", "Angkor_Wat", "Cambodia", "Asia", 13.4125, 103.867, "Nov – Mar", "Buy a 3-day pass and see the sunrise from the main causeway."),
  P("Mount Fuji", "Mount_Fuji", "Japan", "Asia", 35.3606, 138.7274, "Jul – Aug (climbing)", "Lake Kawaguchiko gives the classic reflection view."),
  P("Petra", "Petra", "Jordan", "Asia", 30.3285, 35.4444, "Mar – May, Sep – Nov", "Walk in early; the Monastery climb is 800+ steps."),
  P("Burj Khalifa", "Burj_Khalifa", "UAE", "Asia", 25.1972, 55.2744, "Nov – Mar", "Book the sunset slot online to save on queue time."),
  P("Eiffel Tower", "Eiffel_Tower", "France", "Europe", 48.8584, 2.2945, "Apr – Jun, Sep – Oct", "Pre-book summit tickets; view it from Trocadéro at night."),
  P("Colosseum", "Colosseum", "Italy", "Europe", 41.8902, 12.4922, "Apr – May, Oct", "A combined ticket also covers the Roman Forum."),
  P("Santorini", "Santorini", "Greece", "Europe", 36.3932, 25.4615, "May – Oct", "Walk the Fira to Oia cliff path early in the day."),
  P("Sagrada Família", "Sagrada_Família", "Spain", "Europe", 41.4036, 2.1744, "Apr – Jun, Sep – Oct", "Morning tickets give the best stained-glass light."),
  P("Stonehenge", "Stonehenge", "United Kingdom", "Europe", 51.1789, -1.8262, "May – Sep", "Book the stone-circle access slot at dawn or dusk."),
  P("Machu Picchu", "Machu_Picchu", "Peru", "South America", -13.1631, -72.545, "May – Sep", "Entry is timed and limited; book months ahead."),
  P("Christ the Redeemer", "Christ_the_Redeemer_(statue)", "Brazil", "South America", -22.9519, -43.2105, "Apr – Jun, Sep – Oct", "Take the Corcovado train and go before clouds roll in."),
  P("Galápagos Islands", "Galápagos_Islands", "Ecuador", "South America", -0.9538, -90.9656, "Dec – May", "Use a licensed naturalist guide; rules protect the wildlife."),
  P("Statue of Liberty", "Statue_of_Liberty", "USA", "North America", 40.6892, -74.0445, "Apr – Jun, Sep – Nov", "Book a crown ticket weeks in advance."),
  P("Grand Canyon", "Grand_Canyon", "USA", "North America", 36.1069, -112.1129, "Mar – May, Sep – Nov", "South Rim at sunset; carry more water than you expect."),
  P("Chichén Itzá", "Chichen_Itza", "Mexico", "North America", 20.6843, -88.5678, "Nov – Mar", "Arrive at opening to beat the heat and the tour buses."),
  P("Pyramids of Giza", "Giza_pyramid_complex", "Egypt", "Africa", 29.9792, 31.1342, "Oct – Apr", "Negotiate camel rides before you enter, and agree prices up front."),
  P("Victoria Falls", "Victoria_Falls", "Zambia / Zimbabwe", "Africa", -17.9243, 25.8572, "Feb – May (full flow)", "Bring a rain jacket; the Zambia side is closer to the water."),
  P("Serengeti", "Serengeti_National_Park", "Tanzania", "Africa", -2.3333, 34.8333, "Jun – Oct", "The river-crossing season needs a guide who tracks herds daily."),
  P("Sydney Opera House", "Sydney_Opera_House", "Australia", "Oceania", -33.8568, 151.2153, "Sep – Nov, Mar – May", "Walk the harbour from the Botanic Garden for the postcard view."),
  P("Uluru", "Uluru", "Australia", "Oceania", -25.3444, 131.0369, "May – Sep", "The base walk at sunrise is cooler and quieter."),
];

const GUIDES = [
  { name: "Aarav Reddy", region: "South India", langs: "English, Telugu, Hindi", note: "Temple towns and food walks across Andhra and Tamil Nadu.", price: "₹2,500 / day" },
  { name: "Camille Laurent", region: "Paris and Provence", langs: "English, French", note: "Art, bakery and hidden-courtyard walking tours.", price: "€120 / day" },
  { name: "Hassan Mostafa", region: "Egypt", langs: "English, Arabic", note: "Egyptologist who plans Giza and Luxor around the crowds.", price: "$80 / day" },
  { name: "Lucía Quispe", region: "Cusco and Sacred Valley", langs: "English, Spanish, Quechua", note: "Inca Trail and Machu Picchu with altitude-friendly pacing.", price: "$90 / day" },
  { name: "Kenji Watanabe", region: "Tokyo and Fuji", langs: "English, Japanese", note: "Rail passes, Fuji day trips and quiet shrines.", price: "¥18,000 / day" },
  { name: "Neema Mushi", region: "Serengeti", langs: "English, Swahili", note: "Safari tracker who follows the migration all year.", price: "$150 / day" },
];
