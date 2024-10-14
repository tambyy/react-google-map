"use client";

import { useCallback, useEffect, useState } from "react";
import DirectionsRenderer from "../../components/google/map/DirectionsRenderer";
import DirectionsService from "../../components/google/map/DirectionsService";
import { Marker } from "./marker.type";

/**
 * 
 * Display directions example
 * @param markers List of the directions markers
 */
export default function Directions({ markers }: { markers: Marker[] }) {
  // Direction service options
  const [directionServiceOptions, setDirectionServiceOptions] = useState({
    travelMode: "DRIVING",
  });

  // Direction renderer options
  const [directionRendererOptions, setDirectionRendererOptions] = useState({
    suppressMarkers: true,
  });

  // Directions

  // Directions changed callback
  const onDirectionsLoaded = useCallback((directions) => {
    setDirectionRendererOptions((value) =>
      directions ? { ...value, directions } : value
    );
  }, []);

  // Markers changed
  useEffect(() => {
    // Origin
    const origin =
      markers.length < 2 ? null : { lat: markers[0].lat, lng: markers[0].lng };

    // Destination
    const destination =
      markers.length < 2
        ? null
        : {
            lat: markers[markers.length - 1].lat,
            lng: markers[markers.length - 1].lng,
          };

    // Waypoints
    const waypoints =
      markers.length < 2
        ? null
        : markers.slice(1, markers.length - 1).map(({ lat, lng }) => ({
            location: { lat, lng },
            stopover: true,
          }));

    // Direction service options
    setDirectionServiceOptions((value) => ({
      ...value,
      origin,
      destination,
      waypoints,
    }));
  }, [markers]);

  return (
    <>
      <DirectionsService
        options={directionServiceOptions}
        onDirectionsLoaded={onDirectionsLoaded}
      />
      <DirectionsRenderer options={directionRendererOptions} />
    </>
  );
}
