import AdminSchema from "./AdminSchema.js";

//create new admin
export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};

//update the admin
export const updateAdmin = (filter, obj) => {
  return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};

//find a user
export const findUser = (filter) => {
  return AdminSchema.findOne(filter);
};
