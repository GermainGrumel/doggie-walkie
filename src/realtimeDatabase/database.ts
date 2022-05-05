import { getDatabase, ref, set, child, get, push } from "firebase/database";

const db = getDatabase();

const dbRef = ref(db);
const newUserUid = push(child(ref(db), "users")).key;
console.log("db", db);
// https://firebase.google.com/docs/database/web/lists-of-data

const readUserData = () => {
  get(child(dbRef, `users/${newUserUid}`))
    .then((userData) => {
      if (userData.exists()) {
        const userFromDB = userData.val();
        console.log('userFromDB["newUserUid"] :>> ', userFromDB["newUserUid"]);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const writeUserData = () => {};
export default db;

export const fetchDogData = (dbRef: any) => {
  get(child(dbRef, `dogs`))
    .then((res: any) => {
      let dogsFromDB: any;
      if (res.exists()) {
        dogsFromDB = Object.values(res.val()) as never[];
        console.log("dogsFromDB :>> ", dogsFromDB);
      } else {
        dogsFromDB = [];
        console.log("No data available");
      }
      return dogsFromDB;
    })
    .catch((error: any) => {
      console.error(error);
    });
};
