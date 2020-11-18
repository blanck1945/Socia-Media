import { useEffect, useState } from "react";
import Axios from "axios";

const play = () => {
  const [user, setUser] = useState<any>(undefined);
  const [image, setImage] = useState<any>(undefined);

  useEffect(() => {
    const getMongoUser = async () => {
      const data: any = await Axios.get(
        "http://localhost:3000/api/mongo/getUser"
      );
      console.log(data.data.mongoUser);
      const b64 = Buffer.from(data.data.img.data).toString("base64");

      const mimeType = "image/jpg"; // e.g., image/png
      setImage({
        mimeType,
        b64,
      });
      setUser(data.data.mongoUser);
    };
    getMongoUser();
  }, []);

  return (
    <div>
      {user !== undefined ? (
        <div>
          <h3>{user.name}</h3>
          <img src={image?.b64 ? user.mongoImgString : null} alt="image" />
          <img
            src={
              image?.b64 ? `data:${image.mimeType};base64,${image.b64}` : null
            }
          />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default play;

/*   const mongob64 = Buffer.from(data.data.mongoUser.avatar.data).toString(
        "base64"
      );
      const mongoImgString = `data:image/jpg;base64,${mongob64}`;*/
