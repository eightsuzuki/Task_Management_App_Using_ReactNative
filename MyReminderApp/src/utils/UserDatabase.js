import * as SQLite from 'expo-sqlite';

// Opens or creates a SQLite database called 'users.db'.
export const db = SQLite.openDatabase('users.db');

// Deletes the 'users' table if it exists.
export const dropUsersTable = () => {
  console.log('Dropping all users');
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS users',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(new Error("Failed to drop users table: " + error.message));
        }
      );
    });
  });
};

// Creates the 'users' table if it doesn't already exist.
export const createUsersTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (\
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        username TEXT UNIQUE, \
        password TEXT \
       )'
    );
  });
};

// Retrieves all users from the 'users' table.
export const loadUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(new Error("Failed to load users: " + error.message));
        }
      );
    });
  });
};

// Retrieves a single user by username from the 'users' table.
export const loadUser = (username) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(new Error("Failed to load user: " + error.message));
        }
      );
    });
  });
};

// Deletes a single user by username from the 'users' table.
export const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE username = ?',
        [username],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to delete user: " + error.message));
        }
      );
    });
  });
};

// Adds a new user to the 'users' table.
export const addUser = (values) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to add user: " + error.message));
        }
      );
    });
  });
};

// Updates an existing user's username and password in the 'users' table.
export const updateUser = (values) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET username = ?, password = ? WHERE id = ?',
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error("Failed to update user: " + error.message));
        }
      );
    });
  });
};
