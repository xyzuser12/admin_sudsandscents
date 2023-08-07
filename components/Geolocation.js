import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Stack } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { Autocomplete } from "@mui/material"; // Import Autocomplete component
import TextField from "@mui/material/TextField"; // Import TextField component
import shop from "../pages/assets/shop.json";
import shopIcon from "../pages/assets/shop-image.png";
import L from "leaflet";

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const optionslocation = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          alert(`Error getting user location: ${error.message}`);
        },
        optionslocation
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const [center, setCenter] = useState([14.60159990565482, 120.96359223269259]);

  useEffect(() => {
    if (userLocation) {
      setCenter(userLocation);
    }
  }, [userLocation]);

  const MarkerIcon = new L.Icon({
    iconUrl: require("../pages/assets/marker.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const ShopIcon = new L.Icon({
    iconUrl: shopIcon.src,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const selectedShopIcon = new L.Icon({
    iconUrl: "https://thumbs.gfycat.com/InexperiencedGlossyAsiaticgreaterfreshwaterclam-size_restricted.gif",
    iconSize: [50, 50],
    iconAnchor: [22, 83],
    popupAnchor: [0, -46],
    shadowSize: [41, 41],
  });

  const RedMarkerIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // State for the selected product filter
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State for the selected shop's location
  const [selectedShopLocation, setSelectedShopLocation] = useState(null);

  // Create a function to remove duplicate keywords from the shop data
  const removeDuplicateKeywords = (data) => {
    const uniqueKeywords = new Set();
    const uniqueData = [];

    for (const item of data) {
      const uniqueItem = { ...item, keyword: [] };
      for (const keyword of item.keyword) {
        if (!uniqueKeywords.has(keyword)) {
          uniqueItem.keyword.push(keyword);
          uniqueKeywords.add(keyword);
        }
      }
      uniqueData.push(uniqueItem);
    }

    return uniqueData;
  };

  // Filter the shop data to remove duplicate keywords
  const uniqueShopData = removeDuplicateKeywords(shop);

  // Prepare options for the product filter
  const productOptions = [...new Set(uniqueShopData.flatMap((shop) => shop.keyword).map((keyword) => ({ label: keyword })))];

  // Function to find the nearest shop based on user location and selected product
  const findNearestShop = () => {
    if (userLocation && selectedProduct) {
      let nearestShop = null;
      let minDistance = Number.MAX_VALUE;

      // Calculate the distance between user location and each shop
      for (const shopData of shop) {
        if (shopData.keyword.includes(selectedProduct.label)) {
          const shopLat = parseFloat(shopData.lat);
          const shopLng = parseFloat(shopData.lng);
          const distance = Math.sqrt(Math.pow(shopLat - userLocation[0], 2) + Math.pow(shopLng - userLocation[1], 2));

          if (distance < minDistance) {
            minDistance = distance;
            nearestShop = shopData;
          }
        }
      }

      // Update the selected shop's location
      if (nearestShop) {
        setSelectedShopLocation([parseFloat(nearestShop.lat), parseFloat(nearestShop.lng)]);
      }
    }
  };

  useEffect(() => {
    findNearestShop();
  }, [userLocation, selectedProduct]);

  // Function to handle product filter selection
  const handleProductSelection = (event, newValue) => {
    setSelectedProduct(newValue);
    if (newValue) {
      // Find the selected shop based on the selected product
      const selectedShop = shop.find((shop) => shop.keyword.includes(newValue.label));
      // Update the selected shop's location
      setSelectedShopLocation([parseFloat(selectedShop.lat), parseFloat(selectedShop.lng)]);
    } else {
      setSelectedShopLocation(null);
    }
  };

  // Function to handle click on a shop in the list
  const handleShopClick = (shop) => {
    setSelectedShopLocation([parseFloat(shop.lat), parseFloat(shop.lng)]);
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2); // Return the distance rounded to 2 decimal places
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Sort the shop data based on distance
  const sortedShopData = selectedProduct
    ? shop
        .filter((shop) => shop.keyword.includes(selectedProduct.label))
        .map((shopData) => {
          const distance = userLocation ? calculateDistance(userLocation[0], userLocation[1], parseFloat(shopData.lat), parseFloat(shopData.lng)) : null;
          return { ...shopData, distance };
        })
        .sort((a, b) => a.distance - b.distance)
    : shop
        .map((shopData) => {
          const distance = userLocation ? calculateDistance(userLocation[0], userLocation[1], parseFloat(shopData.lat), parseFloat(shopData.lng)) : null;
          return { ...shopData, distance };
        })
        .sort((a, b) => a.distance - b.distance);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack>
        <div className="sidebar">
          <h1 className="sidebar-hello">Nearest Suppliers</h1>

          {/* Add the product filter Autocomplete component */}
          <Autocomplete options={productOptions} getOptionLabel={(option) => option.label} value={selectedProduct} onChange={handleProductSelection} renderInput={(params) => <TextField {...params} label="Search Product" />} />
        </div>
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <List overflow={"scroll"}>
            {/* Display the filtered and sorted shops */}
            {sortedShopData.map((value, key) => {
              const distance = selectedShopLocation ? calculateDistance(userLocation[0], userLocation[1], parseFloat(value.lat), parseFloat(value.lng)) : null;
              return (
                <ListItem key={key} onClick={() => handleShopClick(value)} style={{ cursor: "pointer" }}>
                  <Stack>
                    <Typography fontSize={"15px"}>{value.shopName}</Typography>
                    <Typography fontSize={"12px"} color={"GrayText"}>
                      {value.shopAddress}
                    </Typography>
                    {distance && (
                      <Typography fontSize={"12px"} color={"GrayText"}>
                        Distance: {distance} km
                      </Typography>
                    )}
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Stack>

      <MapContainer center={selectedShopLocation || center} zoom={12} style={{ height: "70vh", width: "70%" }}>
        <ChangeView coords={selectedShopLocation || center} /> {/* Use the ChangeView component to center the map */}
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=15ykwyoJWegspCVKPZIM" attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' />
        {userLocation && (
          <Marker position={userLocation} icon={RedMarkerIcon}>
            <Popup>
              <b>Your Location</b>
              <p>Latitude: {userLocation[0]}</p>
              <p>Longitude: {userLocation[1]}</p>
            </Popup>
          </Marker>
        )}
        {shop.map((shop, id) => {
          return (
            <Marker position={[shop.lat, shop.lng]} icon={ShopIcon} key={id}>
              <Popup>
                <b>{shop.shopName}</b>
                <br></br>
                <b>{shop.shopAddress}</b>
              </Popup>
            </Marker>
          );
        })}
        {selectedShopLocation && (
          <Marker position={selectedShopLocation} icon={selectedShopIcon}>
            <Popup>
              <b>Selected Shop</b>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Stack>
  );
}
