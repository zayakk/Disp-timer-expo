import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

export default function App() {
  const [time, setTime] = useState(0); // Timer state in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [intervalId, setIntervalId] = useState(null); // Interval ID to clear the interval when needed

  // Start or stop the timer based on current state
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId); // Stop the timer
      setIsRunning(false);
    } else {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time every second
      }, 1000);
      setIntervalId(id);
      setIsRunning(true); // Start the timer
    }
  };

  // Reset the timer to 0
  const resetTimer = () => {
    clearInterval(intervalId); // Clear the interval
    setTime(0); // Reset time to 0
    setIsRunning(false); // Stop the timer
  };

  // Format the timer to show as hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  // Cleanup interval when the component unmounts or the timer is stopped
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      }
    };
  }, [intervalId]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleTimer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
          <Text style={styles.infoText}>
            Tap anywhere to {isRunning ? 'stop' : 'start'} the timer
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Timer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'plum', // Plum background color
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white', // White text for contrast
  },
  infoText: {
    fontSize: 20,
    color: 'white', // White text for contrast
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: 'white', // White background for the reset button
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 18,
    color: 'plum', // Plum text color for the button
  },
});
