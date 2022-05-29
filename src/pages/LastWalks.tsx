import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from "react";

function LastWalks() {
  const db = getDatabase();
  const dbRef = ref(db);
  const [chosenDog, setChosenDog] = React.useState("");
  const [dogsFromDb, setDogsFromDb] = React.useState([]);
  const [usersFromDb, setUsersFromDb] = React.useState<any[]>([]);
  const fetchDogData = () => {
    get(child(dbRef, `dogs`))
      .then((res: any) => {
        let dogsFromDB: any;
        if (res.exists()) {
          dogsFromDB = Object.values(res.val()) as never[];
          setDogsFromDb(dogsFromDB);
          console.log("dogsFromDB :>> ", dogsFromDB);
        } else {
          console.log("No data available");
        }
        return dogsFromDB;
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const fetchUserData = () => {
    get(child(dbRef, `users`))
      .then((res: any) => {
        let usersFromDB: any;
        if (res.exists()) {
          usersFromDB = Object.values(res.val());
          setUsersFromDb(usersFromDB);
          console.log("usersFromDB :>> ", usersFromDB);
        } else {
          console.log("No data available");
        }
        return usersFromDB;
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDogData();
    fetchUserData();
  }, []);
  return <div>LastWalks</div>;
}

export default LastWalks;
