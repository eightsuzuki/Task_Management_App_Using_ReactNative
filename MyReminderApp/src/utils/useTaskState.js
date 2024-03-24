import { useState } from 'react';

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const labels = ['routine', 'emergency'];

const useTaskState = () => {
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
  const [isNotification, setIsNotification] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([true, false]);

  return {
    taskName,
    setTaskName,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedDays,
    setSelectedDays,
    isNotification,
    setIsNotification,
    selectedLabels,
    setSelectedLabels
  };
};

export default useTaskState;
