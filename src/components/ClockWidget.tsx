// src/components/ClockWidget.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';

export const ClockWidget: React.FC = () => {
  const [date, setDate] = useState(new Date());

  // useEffect hook to set up a timer that updates the date state every second
  useEffect(() => {
    // Set up the interval
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    // This is crucial to prevent memory leaks
    return () => {
      clearInterval(timerId);
    };
  }, []); // The empty dependency array means this effect runs only once on mount

  // Determine the greeting based on the current hour
  const hour = date.getHours();
  let greetingText = '';
  if (hour < 5) {
    greetingText = 'Good night';
  } else if (hour < 12) {
    greetingText = 'Good morning';
  } else if (hour < 18) {
    greetingText = 'Good afternoon';
  } else {
    greetingText = 'Good evening';
  }

  // TODO: We will make this name configurable from the Options page later
  const userName = 'Paweł';

  // Format the time and date strings
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {`${greetingText}, ${userName}!`}
      </Typography>
      <Typography variant="h2" component="p" sx={{ fontWeight: 'bold' }}>
        {timeString}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {dateString}
      </Typography>
    </Paper>
  );
};