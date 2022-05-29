import { child, get, set, ref, getDatabase } from "firebase/database";

const db = getDatabase();

export const getCurrentTime = () => {
  const today = new Date(),
    current_time =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  return current_time;
};

export const fetchUsersData: any = async (dbRef: any) => {
  try {
    const response: any = await get(child(dbRef, `users`));
    let users: any = Object.values(response.val());
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentUserData = async (dbRef: any, username: string) => {
  try {
    const response = await get(child(dbRef, `users`));
    if (!response.exists()) return;
    const users: any = Object.values(response.val());
    const user = users.find((element: any) => element.email === username);
    console.log("fetchCurrentUserData", user);
    if (!user) return;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDogsData: any = async (dbRef: any) => {
  try {
    const response: any = await get(child(dbRef, `dogs`));
    let dogs: any = Object.values(response.val());
    console.log("dogs", dogs);
    return dogs;
  } catch (error) {
    console.error(error);
  }
};

export const getDogFromOwner = (users: any[], dogs: any[]) => {
  try {
    const userId = users.map((user) => user.id);
    const owner = dogs.find(
      (element) => element.owner_id === userId.toString()
    );
    console.log("owner", owner);
    return owner;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const writeUserDataFromRegistration = async (
  name: string,
  familyName: string,
  pass: string,
  email: string,
  newUserUid: string | null,
  currentTime: string
) => {
  const userData = {
    username: name + " " + familyName,
    password: pass,
    email: email,
    id: newUserUid,
    creation_date: currentTime,
  };
  try {
    set(ref(db, "users/" + newUserUid), userData).then(() => {
      console.log("userdata", userData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP", e);
  }
};

export const writeUserDataWithPosition = async (
  username: string,
  pass: string,
  email: string,
  newUserUid: string | null,
  currentTime: string,
  latitude: number,
  longitude: number
) => {
  const userData = {
    username: username,
    password: pass,
    email: email,
    id: newUserUid,
    creation_date: currentTime,
    latitude: latitude,
    longitude: longitude,
  };
  try {
    set(ref(db, "users/" + newUserUid), userData).then(() => {
      console.log("userdata", userData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP", e);
  }
};

export const findCurrentUser = (users: any, state: any) => {
  try {
    const findUser = users.find(
      (element: any) => element.email === state.user.email
    );
    return findUser;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
