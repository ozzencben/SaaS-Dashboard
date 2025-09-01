const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  generateAccessToken,
  verifyAccessToken,
} = require("../helpers/TokenServices");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email is already in use" });

    // şema içindeki pre("save") password'u otomatik hashleyecek
    const newUser = new User({
      name,
      email,
      password,
      role: role || "user", // default user
    });

    await newUser.save();

    const token = generateAccessToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not found" });

    // şema içindeki matchPassword metodu kullanılacak
    const isMatch = await existingUser.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Passwords do not match" });

    const token = generateAccessToken({
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    });

    res.json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ================= GET ME =================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    if (decoded.error) return res.status(403).json({ message: decoded.error });

    // decoded içinde sadece email var
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================= CHECK EMAIL =================
router.post("/check-availability", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).json({ message: "This email is already in use" });

    return res.status(200).json({ message: "Email is available" });
  } catch (error) {
    console.error("Check availability error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
