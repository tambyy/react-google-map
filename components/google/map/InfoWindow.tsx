"use client";

import { useEffect, useRef } from "react";
import { useGoogleMap } from "./Map";
import EventListener from "./EventListener";

/**
 * Map Info Window
 * @param options Google Map Info Window options
 * @param marker marker from which we display the info window
 * @param events events listeners
 */
const InfoWindow = ({ options, marker, ...events }) => {
  const { map, google } = useGoogleMap();

  // Instance

  const item = useRef(null);

  /**
   * Component instance
   */
  (() => {
    if (item.current) {
      return;
    }

    item.current = new google.maps.InfoWindow(options);
  })();

  // Open info window on selected marker

  useEffect(() => {
    if (!item.current) {
      return;
    }

    if (!marker) {
      item.current.close();
      return;
    }

    item.current.open(map, marker);
  }, [map, marker]);

  // Update options parameter

  useEffect(() => {
    if (!item.current) {
      return;
    }

    item.current.setOptions(options);
  }, [options]);

  return <EventListener item={item} events={events} />;
};

export default InfoWindow;
