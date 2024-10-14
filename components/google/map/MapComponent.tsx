"use client";

import { useEffect, useRef } from "react";
import { useGoogleMap } from "./Map";
import EventListener from "./EventListener";

const MapComponent = ({ options, component, events }) => {
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

    const componentClass = google.maps[component];
    item.current = new componentClass({
      map,
      ...options,
    });
  })();

  // Update options parameter

  useEffect(() => {
    if (!item.current) {
      return;
    }

    item.current.setOptions(options);
  }, [options]);

  return <EventListener item={item} events={events} />;
};

export default MapComponent;
