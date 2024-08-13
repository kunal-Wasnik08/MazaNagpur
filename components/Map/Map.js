import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

function Map() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getImage');
                const responseData = await response.json();
                if (responseData.status === 'ok') {
                    const data = responseData.data;
                    const formattedData = data.map(item => ({
                        _id: item._id,
                        name: item.name,
                        location: {
                            latitude: item.location.latitude,
                            longitude: item.location.longitude
                        }
                    }));
                    setLocations(formattedData);
                    console.log(formattedData);
                } else {
                    console.error('API response status is not ok:', responseData.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <MapContainer center={[21.1466, 79.0882]} zoom={12} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Array.isArray(locations) && locations.map(location => (
                <Marker key={location._id} position={[parseFloat(location.location.latitude), parseFloat(location.location.longitude)]} icon={redIcon}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
