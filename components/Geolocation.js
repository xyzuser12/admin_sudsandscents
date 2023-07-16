import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Stack } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import shop from '../pages/assets/shop.json';
import shopIcon from '../pages/assets/shop-image.png';

export function ChangeView({ coords }) {
    const map = useMap();
    map.setView(coords, 12);
    return null;
}

export default function Map() {
    const center = [14.60159990565482, 120.96359223269259];
    const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

    const MarkerIcon = new L.Icon({
        iconUrl: require("../pages/assets/marker.png"),
        iconSize: [45, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    });

    const ShopIcon = new L.Icon({
        iconUrl: shopIcon.src,
        iconSize: [45, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    });

    console.log(shop)
    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack >
                <div className="sidebar">
                    <h1 className="sidebar-hello">Nearest Suppliers</h1>
                </div>
                <List overflow={'scroll'}>
                    {
                        shop.map((value, key) => {
                            return (<ListItem>
                                <Stack>
                                    <Typography fontSize={'15px'}>{value.shopName}</Typography>
                                    <Typography fontSize={'12px'} color={'GrayText'}>{value.shopAddress}</Typography>
                                </Stack>

                            </ListItem>)
                        })
                    }

                </List>
            </Stack>


            <MapContainer center={center} zoom={12} style={{ height: '70vh', width: "70%" }}>
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=15ykwyoJWegspCVKPZIM"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                {shop.map((shop, id) => {
                    return (
                        <Marker position={[shop.lat, shop.lng]} icon={ShopIcon} key={id}>
                            <Popup>
                                <b>{shop.shopName}</b>
                                <b>{shop.shopAddress}</b>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </Stack>
    );
}
