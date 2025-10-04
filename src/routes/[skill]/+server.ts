import { json } from '@sveltejs/kit'
import { loadProjectsAndSkills } from '$lib/utils/projects.js'

export async function GET() {
  const { projects, skills } = await loadProjectsAndSkills()
  return json({ projects, skills })
}