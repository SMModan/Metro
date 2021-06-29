import SQLite from "react-native-sqlite-storage";

let db;

export const openSQLiteDB = async () => {

    global.db = await SQLite.openDatabase({ name: 'skyward.db', location: 'default' }, () => console.log("DB Opened"), (error) => console.log("DB ERROR", error));

    return db
}



export const createDefaultTables = async () => {



    global.db.transaction((tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS dropdowns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT ,
            name TEXT ,
            type TEXT 
        );`, [], (tx, results) => {

            console.log("Query completed", results);

            // Get rows with Web SQL Database spec compliance.

            // Alternatively, you can use the non-standard raw method.

            /*
              let rows = results.rows.raw(); // shallow copy of rows Array
       
              rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
            */
        }, (error) => {
            console.log("Query error", error);

        });

        // tx.executeSql(`SELECT name FROM sqlite_temp_master WHERE type='table'`, [], (tx, results) => {
        //     console.log("Query completed".results);

        //     // Get rows with Web SQL Database spec compliance.

        //     var len = results.rows.length;
        //     for (let i = 0; i < len; i++) {
        //         let row = results.rows.item(i);
        //         console.log(`Table name: ${row.name}, `);
        //     }

        //     // Alternatively, you can use the non-standard raw method.

        //     /*
        //       let rows = results.rows.raw(); // shallow copy of rows Array

        //       rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
        //     */
        // });
    });
    // console.log("result", result)
}


export const insertDropDowns = (key, value, type) => {



    // db = await openSQLiteDB()

    return new Promise((resolve, reject) => {

        global.db.transaction((tx) => {
            console.log("Going to insert")

            tx.executeSql(`INSERT INTO dropdowns (key,name,type)
        VALUES (?,?,?)`, [key, value, type], (tx, results) => {
                console.log("Query completed", results);
                resolve(results)
            }, (error) => {
                console.log("insert error", error)
                reject(error)

            });

        });
    })

    // console.log("result", result)

}


export const deleteDropDowns = () => {



    // db = await openSQLiteDB()

    return new Promise((resolve, reject) => {

        global.db.transaction((tx) => {
            console.log("Going to delete")

            tx.executeSql(`DELETE FROM dropdowns`, [], (tx, results) => {
                console.log("Query completed", results);
                resolve(results)
            }, (error) => {
                console.log("delete error", error)
                reject(error)

            });

        });
    })

    // console.log("result", result)

}

export const getDropDowns = (type) => {



    // db = await openSQLiteDB()

    return new Promise((resolve, reject) => {

        global.db.transaction((tx) => {
            console.log("Going to delete")

            tx.executeSql(`Select * from dropdowns where type=?`, [type], (tx, results) => {
                console.log("Query completed", results);
                var len = results.rows.length;
                const dropDown = []
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    // console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`);
                    dropDown.push({
                        id: parseInt(row.key),
                        name: row.name
                    })
                }
                resolve(dropDown)
            }, (error) => {
                console.log("delete error", error)
                reject(error)

            });

        });
    })

    // console.log("result", result)

}