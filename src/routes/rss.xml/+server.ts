import { loadAllProjects } from '$lib/utils/projects';
import { render } from 'svelte/server';

export const prerender = true;

export async function GET({ fetch }) {
  const projects = await loadAllProjects();
  let contentSet = new Map<string, string>();
  for (const project of projects) {
    let contentImport = await import(project.path);
    let { html, head } = await render(contentImport.default);
    contentSet.set(project.slug, html);
  }

  const headers = { 'Content-Type': 'application/xml' }

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>jackgracie.co.uk</title>
				<description>Jack Gracie - Motion Graphics, Video, and Web Design Portfolio</description>
				<link>https://jackgracie.co.uk</link>
				<atom:link href="https://jackgracie.co.uk/rss.xml" rel="self" type="application/rss+xml"/>
				${projects
      .map(
        (project) => `
						<item>
							<title>${project.title}</title>
							<description>${project.description}</description>
							<link>https://jackgracie.co.uk/${project.slug}</link>
							<guid isPermaLink="true">https://jackgracie.co.uk/${project.slug}</guid>
							<author>Jack Gracie</author>
              <body>
                ${contentSet.get(project.slug)}
              </body>
						</item>
					`
      )
      .join('')}
			</channel>
		</rss>
	`.trim()

  return new Response(xml, { headers })
}