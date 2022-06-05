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
    console.log("users", users);
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
    return owner;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const writeUserDataFromRegistration = async (
  name: string,
  familyName: string,
  email: string,
  newUserUid: string | null,
  currentTime: string,
  hasDog: boolean = false
) => {
  const userData = {
    username: name + " " + familyName,
    email: email,
    id: newUserUid,
    creation_date: currentTime,
    hasDog: hasDog,
  };
  try {
    set(ref(db, "users/" + newUserUid), userData).then(() => {
      console.log("userdata", userData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP", e);
  }
};

export const writeUserDataWithLocation = async (
  currentUser: any,
  latitude: number,
  longitude: number,
  walkingDogId: string = "",
  hasDog: boolean = false
) => {
  const userData = {
    username: currentUser.username,
    email: currentUser.email,
    id: currentUser.id,
    creation_date: currentUser.creation_date,
    latitude: latitude,
    longitude: longitude,
    hasDog: hasDog,
    walkingDogId: walkingDogId,
  };
  try {
    set(ref(db, "users/" + currentUser.id), userData).then(() => {
      console.log("userdata", userData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP", e);
  }
};

export const writeUserData = async (currentUser: any, walkingDogId = "") => {
  const userData = {
    username: currentUser.username,
    email: currentUser.email,
    id: currentUser.id,
    creation_date: currentUser.creation_date,
    latitude: currentUser.latitude,
    longitude: currentUser.longitude,
    hasDog: currentUser.hasDog,
    walkingDogId: walkingDogId,
  };
  try {
    set(ref(db, "users/" + currentUser.id), userData).then(() => {
      console.log("userdata", userData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP", e);
  }
};

export const findCurrentUser = (users: any, email: any) => {
  if (!users) return;
  try {
    const findUser = users.find((element: any) => element.email === email);
    return findUser;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const writeDogDataFromRegistration = async (
  name: string,
  gender: string,
  age: string,
  breed: string,
  photos: any,
  defaultDogPicture: string,
  currentUser: any,
  current_time: string,
  newDogUid: any
) => {
  const dogData = {
    dogName: name,
    gender: gender,
    age: age,
    breed: breed,
    profile_picture: photos[0] ? photos[0].filepath : defaultDogPicture,
    owner_id: currentUser?.id,
    id: newDogUid,
    available_at: "",
    description: "",
    creation_date: current_time,
  };
  try {
    set(ref(db, "dogs/" + newDogUid), dogData).then(() => {
      // window.location.href = "/page/HomePage";
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP DOG", e);
  }
};

export const writeDogData = async (
  userDogs: any,
  formattedDate: string = "",
  taken: boolean = false
) => {
  const dogData = {
    dogName: userDogs.dogName,
    gender: userDogs.gender,
    age: userDogs.age,
    breed: userDogs.breed,
    profile_picture: userDogs.profile_picture,
    owner_id: userDogs.owner_id,
    id: userDogs.id,
    available_at: formattedDate,
    description: "",
    creation_date: userDogs.creation_date,
    taken: taken,
  };
  try {
    set(ref(db, "dogs/" + userDogs?.id), dogData).then((res) => {
      console.log("dogData", dogData);
    });
  } catch (e) {
    console.log("ERROR FROM SIGN UP DOG", e);
  }
};

export const findWhoBookedDog = async (users: [], currentUserDog: any) => {
  if (!currentUserDog) return;
  try {
    const booker: any = users.find(
      (user: any) => user.walkingDogId === currentUserDog.id
    );
    return booker;
  } catch (error) {
    console.log(error, "user has not booked a dog yet");
  }
};
