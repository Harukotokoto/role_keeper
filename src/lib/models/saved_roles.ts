import { model, Schema } from 'mongoose';

const saved_roles = model(
  'saved_roles',
  new Schema({
    UserID: {
      type: String,
      required: true,
    },
    Roles: {
      type: [String],
      required: true,
    },
  }),
);

export { saved_roles };
