import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('tasks.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS \
      tasks(\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        name TEXT, \
        startTime DATETIME, \
        endTime TEXT, \
        repeatDay INTEGER, \
        status INTEGER \
        )'
    );
  });
};

export const loadNonCompletionTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasks',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(new Error("Failed to load tasks: " + error.message));
        }
      );
    });
  });
};

export const loadTask = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE id = ?`,
        [id],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(new Error("Failed to delete a task: " + error.message));
        }
      );
    });
  });
};

export const deleteSelectedTask = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to delete a task: " + error.message));
        }
      );
    });
  });
};

export const addTasks = (insertSQL, values) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        insertSQL,
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to add a task: " + error.message));
        }
      );
    });
  });
};

export const updateCurrentTask = (updateSQL, values) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        updateSQL,
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to update task: " + error.message));
        }
      );
    });
  });
};