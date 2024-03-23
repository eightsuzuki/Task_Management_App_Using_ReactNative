import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';

const TaskListItem = ({ styles, item, daysOfWeek, navigation, statusUpdate, deleteTask }) => {
  return (
    <View style={styles.taskItem}>
      <View>
        <Text style={styles.taskText}>{item.name}</Text>
        <Text>Start Time</Text>
                <Text style={{ fontSize: 23 }}>{`${item.starttime}`}</Text>
                <Text>End Time</Text>
                <Text style={{ fontSize: 23 }}>{`${item.endtime}`}</Text>
        <Text>
          Repeat: {item.repeatday ? (
            <>
              {daysOfWeek
                .filter((day, index) => item.repeatday & (1 << index))
                .slice(0, 3)
                .join(', ')}
              {'\n'}
              {daysOfWeek
                .filter((day, index) => item.repeatday & (1 << index))
                .slice(3)
                .join(', ')}
            </>
          ) : (
            'No Repeat'
          )}
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text>Status</Text>
        <Switch value={item.status ? true : false} onValueChange={(newValue) => statusUpdate(newValue, item.id)} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TaskUpdate', { updateTaskId: item.id})}>
        <AntDesign name="edit" size={24} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskListItem;
