import { generateToken } from "../middleware/authMiddleware.js";
import { hash, compare } from "bcrypt";
import { users, sequelize } from "../models/index.js";

const User = users;

//Register User

const registerUser = async (req, res) => {
  const { name, gender, address, mobile_no, email, password } = req.body;
  const transaction = await sequelize.transaction();
  const trimName = await name?.trim() || '';
  try {
    const user = await User.findOne({ where: { email }, raw: true });

    if (user) {
      return res.status(409).json({ message: `User Is Already Registered with id : ${email}` });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hash(password, 10); // 10 is the salt rounds

    //creating new user
    const newUser = await User.create(
      {
        name: trimName,
        gender,
        address,
        mobile_no,
        email,
        password: hashedPassword, // Save the hashed password
      },
      { transaction },
    );
    await transaction.commit();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    await transaction.rollback();
    //handling Sequelize Validation Error
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((errorItem) => {
        return res.status(400).json({ message: errorItem.message });
      });
    } else {
      return res.status(500).json({ message: "Internal server error." });
    }
  }
};

//Login Api
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      //return plain js obj
      where: { email, deletedAt: null },
      attributes: ["id", "name", "gender", "address","mobile_no","password"],
      raw: true,
      nest: true,
    });


    if (!user) return res.status(404).json({ message: "User does not exist" });

    //comparing password
    if (!(await compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    //generate the token -> calling the function from middleware
    const accessToken = generateToken(user);

    if (user.password) {
      delete user.password;
    }
    return res.status(200).json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default { login, registerUser };
