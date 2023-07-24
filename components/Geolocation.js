import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Stack } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import shop from "../pages/assets/shop.json";
import shopIcon from "../pages/assets/shop-image.png";

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

    console.log(shop);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack>
                <div className="sidebar">
                    <h1 className="sidebar-hello">Nearest Suppliers</h1>
                </div>
                <List overflow={"scroll"}>
                    <input
                        type="text"
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                    {shop
                        .filter((value) => {
                            if (searchTerm == "") {
                                return value;
                            } else if (
                                value.shopName.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return value;
                            } else if (
                                value.keyword[0]
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                value.keyword[1]
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                value.keyword[2]
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                value.keyword[3]
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                value.keyword[4]
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            ) {
                                return value;
                            }
                        })
                        .map((value, key) => {
                            return (
                                <ListItem key={key} sx={{ cursor: "pointer" }}>
                                    <Stack>
                                        <Typography fontSize={"15px"}>{value.shopName}</Typography>
                                        <Typography fontSize={"12px"} color={"GrayText"}>
                                            {value.shopAddress}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                            );
                        })}
                </List>
            </Stack>

            <MapContainer
                center={center}
                zoom={12}
                style={{ height: "70vh", width: "70%" }}
            >
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=15ykwyoJWegspCVKPZIM"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                {shop.map((shop, id) => {
                    return (
                        <Marker position={[shop.lat, shop.lng]} icon={ShopIcon} key={id}>
                            <Popup>
                                <b>{shop.shopName}</b> <br />
                                <b>{shop.shopAddress}</b>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </Stack>
    );
}
