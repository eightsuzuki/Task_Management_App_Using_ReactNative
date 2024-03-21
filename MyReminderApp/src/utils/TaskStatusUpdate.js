import { changeTaskStatus, loadCompletedTasks } from "./TaskDatabase";

function taskStatusUpdate() {
  const halfDayInMinutes = 720;
  const intervalTime = halfDayInMinutes * 60 * 1000;
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  
  setInterval(() => {
      const newDate = new Date();
      const newDay = newDate.getDate();


      if (newDay != currentDay) {
          const daysOfWeek = newDate.getDay();
          StatusChange(daysOfWeek);
          currentDay = newDay;
      }
  }, intervalTime);
}

const StatusChange = async (daysOfWeek) => {
  const nextChange = (1 << daysOfWeek) + (1 << ((daysOfWeek + 1) % 7));
  try {
    const CompletedTasks = await loadCompletedTasks();
    CompletedTasks.forEach(task => {
      if (task.repeatday & nextChange){
        values = [ 0, task.id]
        try {
          changeTaskStatus(values);
        } catch (error) {
          console.error(error);
        }
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export default taskStatusUpdate;