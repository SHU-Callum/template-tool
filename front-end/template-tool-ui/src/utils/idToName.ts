import { Team } from "../models/team";
import { Template, TemplateWithTeamName } from "../models/template";
import { User } from "../models/user";


export function addTeamNameToTemplates(templates: Template[], teams: Team[]): TemplateWithTeamName[] {
  const teamMap = new Map(teams.map(team => [team.id, team.teamName]));
  return templates.map(template => ({
    ...template,
    teamName: teamMap.get(template.teamId) || ''
  }));
}

export function filterTemplatesByEditable(templates: TemplateWithTeamName[], user: User, teams: Team[]): TemplateWithTeamName[] {
  return templates.filter((template) => {
    return template.editable === true // where the template is editable
    || template.ownerId === user.id // where user is owner of the template
    || teams.find(team => team.id === template.teamId)?.ownerId === user.id // where user is owner of the team of the template
    }
  );
}

export function templateIsEditable(template: Template, user: User | null, teams: Team[]): boolean {
  if (!user) return false; // if user is null, return false
  return template.editable === true // where the template is editable
    || template.ownerId === user.id // where user is owner of the template
    || teams.find(team => team.id === template.teamId)?.ownerId === user.id // where user is owner of the team of the template
}