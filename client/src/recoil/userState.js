import { atom, selector } from "recoil";
export const userState = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export const userInfo = selector({
  key: "userObj", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const userinf = get(userState);

    return userinf;
  },
});
