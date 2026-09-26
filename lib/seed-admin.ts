import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

export const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    console.log("Admin already exists");
    return existingAdmin;
  }

  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Default admin credentials are missing");
  }

  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  );

  const admin = await Admin.create({
    email,
    passwordHash,
    userRole: "admin",
  });

  console.log(`Default admin created: ${admin.email}`);

  return admin;
};
