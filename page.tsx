"use client";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

// Workout data
const workoutData = {
  1: {
    name: "Day 1",
    exercises: [
      { name: "Incline Press (Multipress)", sets: 4, reps: "6-8", rest: 105 },
      { name: "Body Solid Row", sets: 3, reps: "8-10", rest: 105 },
      { name: "Standing DB Press", sets: 3, reps: "8-10", rest: 105 },
      { name: "Pec Deck", sets: 3, reps: "12-15", rest: 90 },
      { name: "Neutral Pull-Ups", sets: 3, reps: "8-10 (assisted if needed)", rest: 105 },
      { name: "Rope Pushdown", sets: 3, reps: "12-15", rest: 90 },
      { name: "Leg Press", sets: 2, reps: "15-20", rest: 60 },
    ],
  },
  2: {
    name: "Day 2",
    exercises: [
      { name: "Single Arm DB Row (supported)", sets: 4, reps: "6-8", rest: 105 },
      { name: "Flat DB Press", sets: 3, reps: "8-10", rest: 105 },
      { name: "Military Press (Multipress)", sets: 3, reps: "8-10", rest: 105 },
      { name: "Wide Pull-Ups", sets: 3, reps: "8-10 (assisted if needed)", rest: 105 },
      { name: "Cable Rear Delt", sets: 3, reps: "15-20", rest: 90 },
      { name: "DB Alternating Curls", sets: 3, reps: "12-15", rest: 90 },
      { name: "Leg Extension", sets: 2, reps: "15-20", rest: 60 },
    ],
  },
  // Days 3 to 6 omitted for brevity. Include them similarly as above.
};

const WorkoutApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [weights, setWeights] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleWorkoutCompletion = () => {
    const completedWorkout = workoutData[selectedDay].exercises.map((exercise, index) => ({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: weights[index] || 0,
    }));
    const newHistory = [...history, { date: new Date().toLocaleDateString(), completedWorkout }];
    setHistory(newHistory);
    localStorage.setItem("workoutHistory", JSON.stringify(newHistory));
  };

  return (
    <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <div className="max-w-xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Workout Tracker</h2>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Select Day */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className={`p-2 border rounded w-full ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        >
          {Object.keys(workoutData).map((day) => (
            <option key={day} value={day}>
              {workoutData[day].name}
            </option>
          ))}
        </select>

        {/* Workout Exercises */}
        <div className="mt-4">
          {workoutData[selectedDay]?.exercises.map((exercise, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p>{exercise.sets} sets x {exercise.reps} reps</p>
              <input
                type="number"
                step="0.5" // Allows increments of 0.5 kg
                placeholder="Weight (kg)"
                value={weights[index] || ""}
                onChange={(e) => setWeights({ ...weights, [index]: e.target.value })}
                className={`p-2 border rounded w-full mt-2 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Complete Workout Button */}
        <button onClick={handleWorkoutCompletion} className="bg-blue-500 text-white p-2 rounded w-full mt-4">
          Complete Workout
        </button>
      </div>

      {/* Workout History */}
      <div className="max-w-xl mx-auto p-4 mt-4">
        <h2 className="text-xl font-bold">Workout History</h2>
        {history.length === 0 ? (
          <p>No workouts completed yet.</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <h4>{entry.date}</h4>
              <ul>
                {entry.completedWorkout.map((exercise, i) => (
                  <li key={i}>
                    {exercise.name}: {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} kg
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkoutApp;
