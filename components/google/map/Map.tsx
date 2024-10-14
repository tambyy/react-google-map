"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";

/**
 * Google mp context
 */
const GoogleMapContext = createContext(undefined);

/**
 * Google map context hook
 */
export const useGoogleMap = () => {
  const context = useContext(GoogleMapContext);

  if (context === undefined) {
    throw new Error("useGoogleMap must be used with a GoogleMapContext");
  }

  return context;
};

/**
 * Provider component
 * for 'google' and 'map'
 */
export const GoogleMapProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Google map instance
  const [map, setMap] = useState(null);
  // Google instance
  const [google, setGoogle] = useState(null);

  return (
    <GoogleMapContext.Provider value={{ map, google, setMap, setGoogle }}>
      {children}
    </GoogleMapContext.Provider>
  );
};

/**
 * DOM wrapper for the map
 */
const GoogleMapWrapper = ({ apiKey, options, events, children }) => {
  const { map, google, setMap, setGoogle } = useGoogleMap();

  // Ref to the area
  // where we will generate the map instance
  const ref = useRef(null);

  useEffect(() => {
    if (map && google) {
      return;
    }

    // Load Google Map script
    const loadGoogleMap = (callback: (google) => void) => {
      const loader = new Loader({
        apiKey,
      });

      loader.load().then(callback);
    };

    // Create the map instance
    const initializeMap = (google) => {
      setGoogle(google);
      setMap(new google.maps.Map(ref.current, options));
    };

    loadGoogleMap(initializeMap);
  }, [apiKey, options, map, google, setMap, setGoogle]);

  // Events listener

  useEffect(() => {
    /**
     * Get all event handlers name
     * from the props
     * that start with "on"
     */
    const getEvents = () => {
      return Object.keys(events)
        .filter((attrName) => attrName.startsWith("onMap"))
        .map((attrName) => attrName.slice(5).toLowerCase());
    };

    /**
     * Create event handlers
     * for the item
     */
    const addListeners = () => {
      if (!map) {
        return;
      }

      getEvents().forEach((e) => {
        map.addListener(e, (event) => {
          const eventName = "onMap" + e.charAt(0).toUpperCase() + e.slice(1);
          const eventHandler = events[eventName];
          eventHandler(event, map, google);
        });
      });
    };

    /**
     * Remove event handlers
     * from the item
     */
    const removeListeners = () => {
      if (!map) {
        return;
      }

      getEvents().forEach((e) => {
        google.maps.event.clearListeners(map, e);
      });
    };

    addListeners();
    return () => {
      removeListeners();
    };
  }, [events, google, map]);

  return (
    <>
      <div style={{ width: "100%", minHeight: "600px" }} ref={ref}></div>
      {Boolean(map) && Boolean(google) ? children : null}
    </>
  );
};

const Map = ({ apiKey, options, children, ...events }) => {
  return (
    <GoogleMapProvider>
      <GoogleMapWrapper apiKey={apiKey} options={options} events={events}>
        {children}
      </GoogleMapWrapper>
    </GoogleMapProvider>
  );
};

export default Map;
