import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const homepage = defineCollection({
  loader: glob({ base: './src/content/homepage', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publicationTitle: z.string(),
    venue: z.string(),
    venueFull: z.string(),
    authors: z.string(),
    affiliation1: z.string(),
    affiliation2: z.string(),
    email: z.string().optional(),
    arxivLabel: z.string(),
    codeLabel: z.string(),
    videoLabel: z.string().optional(),
    fig1Caption: z.string(),
    abstractTitle: z.string(),
    abstractP1: z.string(),
    abstractP2: z.string(),
    abstractP3: z.string().optional(),
    abstractP4: z.string().optional(),
    motivationTitle: z.string(),
    motivationDesc: z.string(),
    fig2Caption: z.string(),
    methodTitle: z.string(),
    methodOsuTitle: z.string(),
    methodOsuDesc: z.string(),
    methodApfeTitle: z.string(),
    methodApfeDesc: z.string(),
    fig3Caption: z.string(),
    resultsTitle: z.string(),
    resultsDesc: z.string(),
    bibtexTitle: z.string(),
    copyLabel: z.string(),
    copiedLabel: z.string(),
    resourcesTitle: z.string(),
    footerTemplate: z.string(),
    footerLicense: z.string(),
  }),
});

export const collections = { homepage };
