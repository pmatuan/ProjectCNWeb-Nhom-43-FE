import React, { useEffect, useState } from "react";

const useGetLocation = () => {
    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
    })

    const onSuccess = (location) => {
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
    }
    
    const onError = (error) => {
        setLocation({
            error
        })
    }

    useEffect(() => {
        if(!("geolocation" in navigator)) {
            onError({
                codo: 0,
                message: "Geolocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location
}

export default useGetLocation;