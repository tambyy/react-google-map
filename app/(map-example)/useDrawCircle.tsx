"use client";

import { useCallback, useState } from "react";

/**
 * Circle drawing example
 */
export default function useCircle() {
  // Circle
  const [circle, setCircle] = useState({
    drawing: false,
    center: { lat: 50.1773063, lng: 3.2337914 },
    radius: 60000,
  });

  // Circle options
  const circleOptions = {
    strokeOpacity: 0,
    fillColor: "#000000",
    fillOpacity: 0.2,
    clickable: false,
    center: circle.center,
    radius: circle.radius,
  };

  // Circle drawing example

  /**
   * When CTRL + mousedown on the map
   * Begin drawing circle
   */
  const beginDrawCircle = useCallback((event, map) => {
    if (!event.domEvent.ctrlKey) {
      return;
    }

    // Prevent map draggable
    map.setOptions({ draggable: false });

    setCircle({
      drawing: true,
      center: event.latLng,
      radius: 0,
    });
  }, []);

  /**
   * Draw the circle
   * when moving the mouse
   */
  const drawCircle = useCallback(
    (event, map, google) => {
      if (!circle.drawing) {
        return;
      }

      // Calculate the radius of the circle
      // (Distance between LatLng A and LatLng B)
      const radius = google.maps.geometry.spherical.computeDistanceBetween(
        circle.center,
        event.latLng
      );

      setCircle((circle) => ({
        ...circle,
        radius,
      }));
    },
    [circle]
  );

  /**
   * When mouseup on the map
   * End drawing circle
   */
  const endDrawCircle = useCallback(
    (event, map) => {
      if (!circle.drawing) {
        return;
      }

      setCircle((circle) => ({
        ...circle,
        drawing: false,
      }));

      // Allow map draggable
      map.setOptions({ draggable: true });
    },
    [circle]
  );

  return { circleOptions, beginDrawCircle, drawCircle, endDrawCircle };
}
