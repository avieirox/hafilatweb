import { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, Bus, MapPin, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define libraries array outside component to prevent re-initialization warning
const GOOGLE_MAPS_LIBRARIES: ("places")[] = ['places'];


// All Abu Dhabi bus routes data
const busRoutes = [
  // Regional Bus to Abu Dhabi City
  { number: '101', name: 'Reg Bus 101', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; Abu Dhabi Industrial City, Al Wazn St / Dalma Mall Main Entrance', type: 'regional' },
  { number: '102', name: 'Reg Bus 102', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; MBZ City, MBZ City Bus Station', type: 'regional' },
  { number: '103', name: 'Reg Bus 103', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; MBZ City, Al Nasr Street / Abu Dhabi Vocational Education and Training Institute (ADVETI)', type: 'regional' },
  { number: '110', name: 'Reg Bus 110', route: 'Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Mussafah, Street 16 / National Petroleum Corporation', type: 'regional' },
  { number: '111', name: 'Reg Bus 111', route: 'Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Mussafah, Street 14 / Tasheel', type: 'regional' },
  { number: '120', name: 'Reg Bus 120', route: 'Al Saadiyat, Shati Al Saadiyat Street / Saadiyat Public Beach; MBZ City, Street 79 / Mazyad Mall', type: 'regional' },
  { number: '121', name: 'Reg Bus 121', route: 'Al Saadiyat, Al Dhiba Street / Hidd Al Saadiyat; MBZ, Street 79 / Mazyad Mall', type: 'regional' },
  { number: '155', name: 'Reg Bus 155', route: 'Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Shakhbout City, ADNOC', type: 'regional' },
  { number: '160', name: 'Reg Bus 160', route: 'Al Danah, Sultan Bin Zayed Street / Khalifa Bin Zayed Street; Khalifa City, Theyab Bin Eissa Street / Souq', type: 'regional' },
  { number: '161', name: 'Reg Bus 161', route: 'Al Bateen, Corniche Street / Commercial International Bank; Khalifa City, Theyab Bin Eissa Street / Souq', type: 'regional' },
  { number: '170', name: 'Reg Bus 170', route: 'Al Saadiyat, Saadiyat New York University 2; Al Rahah, Al Zeina', type: 'regional' },
  { number: '175', name: 'Reg Bus 175', route: 'Al Bateen, Al Bateen Street / Children\'s Garden; Al Rahah, Al Zeina', type: 'regional' },
  { number: '201', name: 'Reg Bus 201', route: 'Al Bahyah, Al Sa\'ay St / Shuhadah Badar Mosque; Al Nahyan, Abu Dhabi Bus Station', type: 'regional' },
  { number: '202', name: 'Reg Bus 202', route: 'Al Rahbah, Al Yaseer St / Al Rahba Hospital; Al Nahyan, Abu Dhabi Bus Station', type: 'regional' },
  { number: '300', name: 'Reg Bus 300', route: 'Al Shamkha, Al Shamkha Makani Mall; Al Danah, Sultan Bin Zayed St / Capital Park', type: 'regional' },
  { number: '350', name: 'Reg Bus 350', route: 'Sweihan Slaughter House; Central District, Othman Bin Affan St / Al Ain Central Bus Station', type: 'regional' },
  { number: '360', name: 'Reg Bus 360', route: '81th St / Ali Hader Al Mazrouei Mosque; Central District, Othman Bin Affan St / Al Ain Central Bus Station', type: 'regional' },
  { number: '380', name: 'Reg Bus 380', route: 'Service Rd / Al Rahman Mosque; Central District, Othman Bin Affan St / Al Ain Central Bus Station', type: 'regional' },
  { number: '390', name: 'Reg Bus 390', route: 'Service Rd / Souq; Central District, Othman Bin Affan St / Al Ain Central Bus Station', type: 'regional' },
  { number: '401', name: 'Reg Bus 401', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; Bani Yas, Bani Yas St / Souq', type: 'regional' },
  { number: '404', name: 'Reg Bus 404', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; Al Nahdah, Al Burouj St /Municipality office', type: 'regional' },
  { number: '405', name: 'Reg Bus 405', route: 'Al Danah, Sultan Bin Zayed St / Capital Park; Al Nahdah, Al Burouj St /Municipality office', type: 'regional' },
  { number: '407', name: 'Reg Bus 407', route: 'Al Zahiyah, Ghurair Al Ojaan Mosque; Al Mafraq Workers City, Al Raha Shopping Centre', type: 'regional' },
  
  // Regional Bus between Suburbs
  { number: '210', name: 'Midi Bus 210', route: 'Al Bahyah, Al Sinad St / Al Shahama Bus Station; Abu Dhabi Industrial City, Al Wazn St / Dalma Mall Main Entrance', type: 'midi' },
  { number: '216', name: 'Midi Bus 216', route: 'Al Bahyah, Al Sinad St / Al Shahama Bus Station; MBZ City, MBZ City Bus Station', type: 'midi' },
  { number: '410', name: 'Midi Bus 410', route: 'Mussafah, Street 7 / Mussafah Port; Al Mafraq Workers City, LifeCare Hospital', type: 'midi' },
  { number: '420', name: 'Midi Bus 420', route: 'Shakhbout City, ADNOC; Al Mafraq Workers City, LifeCare Hospital', type: 'midi' },
  
  // Airport Bus
  { number: 'A1', name: 'Reg Bus A1', route: 'Al Zahiyah, Ghurair Al Ojaan Mosque; Abu Dhabi International Airport, Terminal 2', type: 'airport' },
  { number: 'A2', name: 'Reg Bus A2', route: 'Al Danah, Khalifa Bin Zayed St / Shk. Zayed Bin Sultan St; Abu Dhabi International Airport, Terminal 2', type: 'airport' },
  { number: 'A10', name: 'Reg Bus A10', route: 'MBZ City, MBZ City Bus Station; MBZ City, MBZ City Bus Station', type: 'airport' },
  { number: 'A40', name: 'Reg Bus A40', route: 'Al Bahyah, Al Sinad St / Al Shahama Bus Station; Baniyas West, Baniyas West Bus Station', type: 'airport' },
  
  // City Bus Network - Express
  { number: 'X4', name: 'City Bus X4', route: 'Al Zahiyah, Al Meena St / Corniche Hospital 2; Rabdan, Khaleej Al Arabi St / Bus Interchange', type: 'express' },
  { number: 'X5', name: 'City Bus X5', route: 'Al Zahiyah, Al Meena St / Corniche Hospital 2; Rabdan, Khaleej Al Arabi St / Bus Interchange', type: 'express' },
  { number: 'X60', name: 'Exp Bus X60', route: 'Al Nahyan, Abu Dhabi Bus Station; Liwa Mezaira\'a Bus Station', type: 'express' },
  { number: 'X88', name: 'Exp Bus X88', route: 'Al Nahyan, Abu Dhabi Bus Station; Ruwais ADNOC Bus Station', type: 'express' },
  { number: 'X90', name: 'Exp Bus X90', route: 'Service Road / Al Ain Central Bus Station; Al Nahyan, Abu Dhabi Bus Station', type: 'express' },
  
  // City Bus - Local
  { number: '5', name: 'City Bus 5', route: 'Al Zahiyah, Al Falah St / Shk. Zayed Bin Sultan St; Al Kasir, King Salman Bin Abdulaziz Al Saud St / Marina Mall', type: 'city' },
  { number: '7', name: 'City Bus 7', route: 'Al Zahiyah, Al Falah Street / Sheikh Zayed Bin Sultan Street; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '8', name: 'City Bus 8', route: 'Zayed Port, Al Doum St / Fish Market; Al Bateen, Al Quffal St / Marina Al Bateen', type: 'city' },
  { number: '9', name: 'City Bus 9', route: 'Zayed Port, Cruise Terminal; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '11', name: 'City Bus 11', route: 'Zayed Port, Al Suhiliyah Street / Al Mina Centre; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '21', name: 'City Bus 21', route: 'Rabdan, Al Maqta Street / Quran Memorisation Centre; Al Bateen, Al Bateen Street / Children\'s Garden', type: 'city' },
  { number: '22', name: 'City Bus 22', route: 'Rabdan, Al Khor Street / Qaryat Al Beri Souq; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '23', name: 'City Bus 23', route: 'Bawabat Abu Dhabi, Bawabat Abu Dhabi Street / Coop; Al Bateen, Al Bateen Street / Children\'s Garden', type: 'city' },
  { number: '26', name: 'City Bus 26', route: 'Al Muntazeh, Al Muntazeh Street / Khalifa Park; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '33', name: 'City Bus 33', route: 'Al Rawdah, Al Mu-atamarat Street / ADNEC; Al Bateen, Al Bateen Street / Children\'s Garden', type: 'city' },
  { number: '34', name: 'City Bus 34', route: 'Al Rawdah, Al Nawfal Street / Abu Dhabi Courts; Al Ras Al Akhdar, Qasar Al Watan', type: 'city' },
  { number: '40', name: 'City Bus 40', route: 'Al Muntazeh, Al Sunbulah Street / Al Muntazeh South; Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah', type: 'city' },
  { number: '41', name: 'City Bus 41', route: 'Al Rawdah, Al Mu-atamarat Street / Al Zahiyah, Al Meena Street / Corniche Hospital 1', type: 'city' },
  { number: '42', name: 'City Bus 42', route: 'Al Rawdah, Al Nawfal Street / Abu Dhabi Courts; Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah', type: 'city' },
  { number: '43', name: 'City Bus 43', route: 'Al Mushrif, Al Markib Street / Al Mushrif Coop; Al Zahiyah, Al Meena Street / Corniche Hospital 2', type: 'city' },
  { number: '44', name: 'City Bus 44', route: 'Al Muzoun, Al Nada Street / Abu Dhabi Ladies Club; Zayed Port, Cruise Terminal', type: 'city' },
  { number: '45', name: 'City Bus 45', route: 'Al Nahyan, Abu Dhabi Bus Station / Al Nahyan, Abu Dhabi Bus Station', type: 'city' },
  { number: '54', name: 'City Bus 54', route: 'Al Rawdah, Saif Ghobash Street / Sheikh Zayed Grand Mosque; Zayed Port, Al Doum Street / Fish Market', type: 'city' },
  { number: '55', name: 'City Bus 55', route: 'Al Muntazeh, Al Sunbulah Street / Al Muntazeh South; Al Zahiyah, Al Meena Street / Corniche Hospital 1', type: 'city' },
  { number: '56', name: 'City Bus 56', route: 'Al Muntazah, Al Muntazah St / Khalifa Park; Zayed Port, Al Luluah St / Al Qibli St', type: 'city' },
  { number: '63', name: 'City Bus 63', route: 'Al Reem Island, Al Reem Mall; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '65', name: 'City Bus 65', route: 'Jazeerat Al Reem, Al Rayfah Street / Al Reem City of Lights; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '67', name: 'City Bus 67', route: 'Jazeerat Al Reem, Al Muqarrab Street / Al Reem Shams; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '69', name: 'City Bus 69', route: 'Jazeerat Al Maryah, Hamouda Bin Ali Al Dhaheri Street / Al Maryah; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '71', name: 'City Bus 71', route: 'Jazeerat Al Reem, Al Muqarrab Street / Al Reem Shams; Al Kasir, King Salman Bin Abdulaziz Al Saud Street / Marina Mall', type: 'city' },
  { number: '73', name: 'City Bus 73', route: 'Jazeerat Al Reem, Al \'Oud St / Al Reem Shams; Al Hudayriat, Bab Al Nojoum', type: 'city' },
  { number: '94', name: 'City Bus 94', route: 'Al Rawdah, Al Majd Street / Wahat Al Karamah; Al Saadiyat, Jacques Chirac Street / Mamsha Al Saadiyat', type: 'city' },
];


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 24.4700,
  lng: 54.3700,
};

interface BusStop {
  position: google.maps.LatLngLiteral;
  name: string;
  placeId: string;
}

const AbuDhabiBusRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState<typeof busRoutes[0] | null>(busRoutes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ duration: string; distance: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: 'en',
  });

  useEffect(() => {
    if (isLoaded && selectedRoute && window.google) {
      setIsLoading(true);
      setError(null);
      const [origin, destination] = selectedRoute.route.split(';').map(s => s.trim());
      
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: `${origin}, Abu Dhabi, UAE`,
          destination: `${destination}, Abu Dhabi, UAE`,
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            // Extract and set route information
            if (result.routes[0] && result.routes[0].legs[0]) {
              setRouteInfo({
                duration: result.routes[0].legs[0].duration?.text || 'N/A',
                distance: result.routes[0].legs[0].distance?.text || 'N/A',
              });
            } else {
              setRouteInfo(null);
            }
            // Search for bus stops along the route
            searchBusStopsAlongRoute(result);
          } else {
            console.error('Directions request failed:', status);
            setDirections(null);
            setBusStops([]);
            setRouteInfo(null);
            setError(`Failed to load directions: ${status}`);
          }
          setIsLoading(false);
        }
      );
    } else if (isLoaded && !selectedRoute) {
      setDirections(null);
      setBusStops([]);
      setRouteInfo(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isLoaded, selectedRoute]);

  const searchBusStopsAlongRoute = (directionsResult: google.maps.DirectionsResult) => {
    if (!map || !window.google) return;

    const route = directionsResult.routes[0];
    if (!route || !route.legs[0]) return;

    const path = route.overview_path;
    const allStops: BusStop[] = [];
    const processedPlaceIds = new Set<string>();

    // Search at multiple points along the route
    const searchPoints = [
      path[0], // Start
      path[Math.floor(path.length * 0.25)], // 25%
      path[Math.floor(path.length * 0.5)], // 50%
      path[Math.floor(path.length * 0.75)], // 75%
      path[path.length - 1], // End
    ];

    const service = new google.maps.places.PlacesService(map);
    let completedSearches = 0;

    searchPoints.forEach((point) => {
      const request = {
        location: point,
        radius: 1500, // 1.5km radius
        type: 'bus_station',
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            if (place.place_id && place.geometry?.location && !processedPlaceIds.has(place.place_id)) {
              processedPlaceIds.add(place.place_id);
              allStops.push({
                position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
                name: place.name || 'Bus Stop',
                placeId: place.place_id,
              });
            }
          });
        }

        completedSearches++;
        if (completedSearches === searchPoints.length) {
          setBusStops(allStops);
        }
      });
    });
  };


  const filteredRoutes = busRoutes.filter(route =>
    route.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRouteTypeColor = (type: string) => {
    switch (type) {
      case 'regional': return 'bg-primary/10 text-primary border-primary/20';
      case 'midi': return 'bg-accent/10 text-accent border-accent/20';
      case 'airport': return 'bg-success/10 text-success border-success/20';
      case 'express': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'city': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStrokeColor = (type: string) => {
    switch (type) {
      case 'regional': return '#2563eb'; // Blue
      case 'midi': return '#f59e0b'; // Amber
      case 'airport': return '#10b981'; // Green
      case 'express': return '#ef4444'; // Red
      case 'city': return '#8b5cf6'; // Violet
      default: return '#6b7280'; // Gray
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Abu Dhabi Bus Routes & Schedule - Track Buses Online</title>
        <meta name="description" content="Tracking online Abu Dhabi bus routes in our interactive map. Find your bus route without errors" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-glow to-accent py-6 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
            Abu Dhabi Bus Routes & Schedule
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl">
            Explore all Abu Dhabi bus routes and plan your journey with interactive maps
          </p>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4 h-auto lg:h-[calc(100vh-220px)]">
          
          {/* Left Side - Routes List */}
          <Card className="p-3 md:p-4 flex flex-col h-[50vh] lg:h-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 -mx-3 md:-mx-4 px-3 md:px-4">
              <div className="space-y-1.5 md:space-y-2">
                {filteredRoutes.map((route) => (
                  <button
                    key={route.number}
                    onClick={() => setSelectedRoute(route)}
                    className={`w-full text-left p-2.5 md:p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedRoute?.number === route.number
                        ? 'bg-primary/5 border-primary shadow-sm'
                        : 'bg-card border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 md:gap-2.5">
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Bus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Badge variant="outline" className={`${getRouteTypeColor(route.type)} text-xs px-1.5 py-0`}>
                            {route.number}
                          </Badge>
                          <span className="text-xs text-muted-foreground capitalize">
                            {route.type}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {route.route}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Info moved below map */}
          </Card>

          {/* Right Side - Google Map */}
          <Card className="p-0 overflow-hidden h-[50vh] lg:h-full lg:flex-1">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={10}
                onLoad={(mapInstance) => setMap(mapInstance)}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      suppressMarkers: false,
                      polylineOptions: {
                        strokeColor: selectedRoute ? getStrokeColor(selectedRoute.type) : '#2563eb',
                        strokeWeight: 5,
                        strokeOpacity: 0.8,
                      },
                    }}
                  />
                )}
                {busStops.map((stop) => (
                  <Marker
                    key={stop.placeId}
                    position={stop.position}
                    title={stop.name}
                    onClick={() => setInfoWindowOpen(stop.placeId)}
                    icon={{
                      path: 'M12 2c-4.418 0-8 3.582-8 8 0 4.418 8 14 8 14s8-9.582 8-14c0-4.418-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z', // Custom pin-like path
                      fillColor: selectedRoute ? getStrokeColor(selectedRoute.type) : '#6b7280',
                      fillOpacity: 1,
                      strokeColor: '#ffffff',
                      strokeWeight: 2,
                      scale: 1,
                      anchor: new google.maps.Point(12, 24), // Adjust anchor to center the tip of the pin
                    }}
                  >
                    {infoWindowOpen === stop.placeId && (
                      <InfoWindow
                        onCloseClick={() => setInfoWindowOpen(null)}
                        position={stop.position}
                      >
                        <div>
                          <h3 className="font-semibold">{stop.name}</h3>
                          <p>Bus Stop</p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
            ) : isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Loading route and stops...</p>
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-destructive font-semibold text-center p-4">{error}</p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Select a bus route to see details on the map</p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Card below the map and list */}
        <Card className="mt-4 p-3 md:p-4 bg-primary/5 border border-primary/20 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base font-medium text-foreground">Service information</p>
            <button
              type="button"
              onClick={() => setInfoOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-xs md:text-sm text-primary hover:bg-primary/10 px-2 py-1 rounded"
              aria-expanded={infoOpen}
              aria-controls="service-info-content"
            >
              {infoOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {infoOpen ? 'Hide' : 'Show'} details
            </button>
          </div>

          {infoOpen && (
            <div id="service-info-content">
              <div className="mt-3 space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-primary" />
                  <span>
                    Total Routes: <span className="font-semibold text-foreground">{filteredRoutes.length}</span>
                  </span>
                </p>
                {routeInfo && (
                  <>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        Duration: <span className="font-semibold text-foreground">{routeInfo.duration}</span>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>
                        Distance: <span className="font-semibold text-foreground">{routeInfo.distance}</span>
                      </span>
                    </p>
                  </>
                )}
              </div>

              <p className="mt-3 text-xs md:text-sm font-medium text-foreground">Service schedule overview</p>
              <div className="mt-2 overflow-x-auto -mx-1 max-h-44 md:max-h-60 overflow-y-auto border border-border rounded">
                <table className="min-w-full table-fixed text-[11px] md:text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-2 py-1 text-left font-medium">Route / Line</th>
                      <th className="px-2 py-1 text-left font-medium whitespace-nowrap">First Bus</th>
                      <th className="px-2 py-1 text-left font-medium whitespace-nowrap">Last Bus</th>
                      <th className="px-2 py-1 text-left font-medium whitespace-nowrap">Frequency (min)</th>
                      <th className="px-2 py-1 text-left font-medium whitespace-nowrap">Service Days</th>
                      <th className="px-2 py-1 text-left font-medium">Estimated Schedule (detail)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-2 py-1 align-top">City Routes (e.g., 5, 7, 8, ...)</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">06:00</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">23:00</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">15-30</td>
                      <td className="px-2 py-1 align-top">All (Sun-Sat)</td>
                      <td className="px-2 py-1 align-top">Buses every 15-30 minutes, running between terminals and neighborhoods from around 06:00 to 23:00.</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 align-top">Intercity (e.g., E100, E101, ...)</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">05:30</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">23:30</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">30-60</td>
                      <td className="px-2 py-1 align-top">All</td>
                      <td className="px-2 py-1 align-top">Long-distance services between central stations and towns every 30-60 minutes. E100: from Abu Dhabi Central, departures every 30-60 min; last bus to Al Ghubaiba (Dubai) around 23:10.</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 align-top">Express (X5, X60, ...)</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">07:00</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">22:00</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">30-45</td>
                      <td className="px-2 py-1 align-top">All</td>
                      <td className="px-2 py-1 align-top">Fast direct services with fewer stops and shorter travel times.</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 align-top">Tourist and Special Buses</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">09:30</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">17:00</td>
                      <td className="px-2 py-1 align-top whitespace-nowrap">60-90</td>
                      <td className="px-2 py-1 align-top">Daily</td>
                      <td className="px-2 py-1 align-top">Hop-on hop-off City Tour: 09:30-17:00, every ~90 min. Grand Mosque tour: special departures at 11:30 and 14:30.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AbuDhabiBusRoutes;
