import { Event } from '../../lib/modules/Event';
import { saved_roles } from '../../lib/models/saved_roles';

export default new Event('guildMemberRemove', async (member) => {
  const roles = member.roles.cache.map((role) => role.id);
  const saved_role = await saved_roles.findOne({ UserID: member.id });
  if (saved_role) {
    saved_role.Roles = roles;
    await saved_role.save();
  } else {
    await saved_roles.create({
      UserID: member.id,
      Roles: roles,
    });
  }
});
