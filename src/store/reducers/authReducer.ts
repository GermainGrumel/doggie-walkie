let initState = {
  user: {
    username: "Germain",
    age: 22,
    gender: "Monsieur",
    phone: "0652707390",
    email: "germaingrumel@outlook.fr",
  },
  dog: [
    {
      name: "Toto",
      id: 1,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 2,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 3,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 4,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 5,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 6,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
    {
      name: "Toto",
      id: 7,
      age: 22,
      profile_picture:
        "https://images.unsplash.com/photo-1542483451-80037cfba5e7",
      breed: "Berger Allemand",
    },
  ],
};
const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      state.user = action.user;
  }
  return state;
};

export default authReducer;
