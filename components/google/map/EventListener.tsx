"use client";

import { useEffect } from "react";
import { useGoogleMap } from "./Map";

/**
 * EventListener is a component
 * that can listen to events,
 * therefore interact with user actions
 */
const EventListener = ({ item, events }) => {
  const { google } = useGoogleMap();

  // Manage event listeners

  useEffect(() => {
    if (!item.current) {
      return;
    }

    /**
     * Get all event handlers name
     * from the props
     * that start with "on"
     */
    const getEvents = () => {
      return Object.keys(events)
        .filter((attrName) => attrName.startsWith("on"))
        .map((attrName) => attrName.slice(2).toLowerCase());
    };

    /**
     * Create event handlers
     * for the item.current
     */
    const addListeners = () => {
      getEvents().forEach((e) => {
        google.maps.event.addListener(item.current, e, (event) => {
          const eventName = "on" + e.charAt(0).toUpperCase() + e.slice(1);
          const eventHandler = events[eventName];
          eventHandler(event, item.current);
        });
      });
    };

    /**
     * Remove event handlers
     * from the item.current
     */
    const removeListeners = () => {
      getEvents().forEach((e) => {
        google.maps.event.clearListeners(item.current, e);
      });
    };

    addListeners();
    return () => {
      removeListeners();
    };
  }, [google, events, item]);

  return null;
};

export default EventListener;
