"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
 
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props: any) => {
    return <p {...props.attributes}>{props.children}</p>;
  }, []);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      height: '100vh',  // Ensure the parent has full height
      gap: '20px', 
      backgroundColor: '#f0f4f8', 
      color: '#333', 
      padding: '20px' 
    }}>
    
      {/* Left Section: Text Editor */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'auto'
      }}>

        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#444' }}>Travel Log</h2>
        <Slate
          editor={editor}
          initialValue={initialValue}
        >
          <Editable renderElement={renderElement} style={{ height: '100%' }} placeholder="Write your travel experiences here..." />
        </Slate>
      </div>
      
      {/* Right Section: Map and Calendar */}
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        height: '100%'
      }}>
        {/* Map View */}
        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#444' }}>Map View</h2>
          <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: '100%', borderRadius: '8px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[37.7749, -122.4194]}>
              <Popup>San Francisco</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Calendar View */}
        <div style={{ paddingTop: '10px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#444' }}>Calendar View</h2>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            tileClassName="react-calendar__tile--light" // Custom class for calendar tiles
          />
          <div style={{ marginTop: '20px' }}>
            {selectedDate ? (
              <p style={{ fontSize: '18px' }}>Selected Date: {selectedDate.toDateString()}</p>
            ) : (
              <p style={{ fontSize: '18px' }}>Please select a date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
