import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Auth Header:", authHeader); // Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token Extracted:", token); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User:", decoded); // Debugging

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
