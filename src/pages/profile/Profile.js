import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/AuthSlice";
import Avatar from "react-avatar";
import { UseCurrentUser } from "../../config/Hooks";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = UseCurrentUser();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <form>
          <Avatar
            size="70px"
            round="100%"
            color={Avatar.getRandomColor("sitebase", ["#7a63ff"])}
            name={currentUser?.email}
          />
          <h1>Profile </h1>
          <input readOnly value={currentUser?.email} />
          <button onClick={handleLogOut}>Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
