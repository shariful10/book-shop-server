import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  defaultPassword: process.env.DEFAULT_PASS,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  resetPassUILink: process.env.RESET_PASS_UI_LINK,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
};
