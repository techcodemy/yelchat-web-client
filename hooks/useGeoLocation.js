import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        error:false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            error:false,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error:true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;