import config from "../config";
import { USER_ROLE } from "../modules/user/user.const";
import { User } from "../modules/user/user.model";

const superUser = {
  name: "Shariful Islam",
  email: "sharifulislam@gmail.com",
  password: config.superAdminPassword,
  role: USER_ROLE.superAdmin,
};

const seedSuperAdmin = async () => {
  // When database is connected, we will check is there  any user who is super admin

  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
