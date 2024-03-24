import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('tasks.db');

export const dropCommitsTable = () => {
  console.log('drop all');
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS commits',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(new Error("Failed to drop commits table: " + error.message));
        }
      );
    });
  });
};


export const createCommitTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS \
      commits(\
        date DATE, \
        count INTEGER \
        )'
    );
  });
};

export const updateCommitCount = (commitdate) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO commits (date, count) 
        SELECT ?, 0
        WHERE NOT EXISTS (
          SELECT 1 FROM commits WHERE date = ?
        )`,
        [commitdate, commitdate],
        () => {
          resolve();
        },
        (_, error) => {
          reject(new Error("Failed to update commits table: " + error.message));
        }
      );
      tx.executeSql(
        `UPDATE commits SET count = count + 1 WHERE date = ? 
        AND EXISTS (SELECT 1 FROM commits WHERE date = ?)`,
        [commitdate, commitdate],
        () => {
          resolve();
        },
        (_, error) => {
          reject(new Error("Failed to update commits table: " + error.message));
        }
      );
    });
  });
};


export const loadCommitData = (currentdate) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        SELECT * FROM commits 
        WHERE date BETWEEN DATE(?, '-30 days') AND DATE(?)
        `,
        [currentdate, currentdate],
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


export const dummyCommitment = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      for(let i = 1; i < 30; i++){
        let commitdate = "2024-03-"
        if(i < 10){
          commitdate += '0'+String(i);
        } else {
          commitdate += String(i);
        }
        let count = Math.floor(Math.random()*11);
        tx.executeSql(
          `INSERT INTO commits (date, count) 
          SELECT ?, ?`,
          [commitdate, count],
          () => {
            resolve();
          },
          (_, error) => {
            reject(new Error("Failed to update commits table: " + error.message));
          })
      }
    })
  })
}