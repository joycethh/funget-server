import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);

    const isLocalAuth = token.length < 500;

    let decodedData;

    if (token && isLocalAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
      console.log("decodedData", decodedData);
      return (req.userId = decodedData?.id);
    } else {
      decodedData = jwt.decode(token);
      return (req.userId = decodedData?.sub);
    }

    next();
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

export default authMiddleWare;
