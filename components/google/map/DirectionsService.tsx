"use client";

import { useEffect, useRef } from "react";
import { useGoogleMap } from "./Map";

/**
 * Map Directions Service
 * @param options Google Map Directions Renderer options
 * @param onDirectionsLoaded events listeners for directions loaded
 */
const DirectionsService = ({ options, onDirectionsLoaded }) => {
  const { google } = useGoogleMap();

  // Instance

  const directionsService = useRef(null);
  (() => {
    if (directionsService.current) {
      return;
    }

    directionsService.current = new google.maps.DirectionsService();
  })();

  // Calculate direction

  useEffect(() => {
    const calculateDirections = () => {
      if (
        !directionsService.current ||
        !options ||
        !options.origin ||
        !options.destination ||
        !options.travelMode
      ) {
        return;
      }

      directionsService.current.route(options, (response, status) => {
        if (status === "OK") {
          onDirectionsLoaded(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      });
    };

    calculateDirections();
  }, [options, onDirectionsLoaded]);

  return null;
};

export default DirectionsService;
