import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isLocalAuth = token.length < 500;

    let decodedData;

    if (token && isLocalAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
      console.log("decodedData", decodedData);

      req.userId = decodedData?.id;
      req.author = decodedData?.username;
      req.avatar = decodedData?.name.charAt(0);
    } else {
      decodedData = jwt.decode(token);
      console.log("decodedData", decodedData);

      req.userId = decodedData?.sub;
      req.author = decodedData?.name;
      req.avatar = decodedData?.picture;
    }
    console.log("decodedData", decodedData);

    next();
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

export default authMiddleWare;
