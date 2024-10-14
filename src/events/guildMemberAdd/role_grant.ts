import { Event } from '../../lib/modules/Event';
import { saved_roles } from '../../lib/models/saved_roles';

export default new Event('guildMemberAdd', async (member) => {
  const saved_role = await saved_roles.findOne({ UserID: member.id });
  if (saved_role) {
    for (const roleId of saved_role.Roles) {
      const role = await member.guild.roles.fetch(roleId);
      if (!role) continue;

      await member.roles.add(role);
    }
  } else {
    return;
  }
});
