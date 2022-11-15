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
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};

export default authMiddleWare;
