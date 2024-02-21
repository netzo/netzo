import { ulid } from "netzo/plugins/api/utils.ts";
import { faker } from "npm:@faker-js/faker@8.4.0";
import { z } from "zod";

// schemas:

export const contactSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  accountDomain: z.string(), // Will be used to match records from email domain, once associated with an account, it will be removed from here
  name: z.string(),
  image: z.string().url(),
  position: z.string(),
  department: z.string(),
  phones: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })),
  emails: z.array(z.object({
    name: z.string(),
    value: z.string().email(),
  })),
  links: z.array(z.object({
    name: z.string(),
    value: z.string().url(),
  })),
  notes: z.array(z.object({
    text: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  consent: z.object({
    documents: z.boolean(),
    documentsTimestamp: z.number(),
    marketing: z.boolean(),
    marketingLastTimestamp: z.number(),
    terms: z.boolean(),
    termsTimestamp: z.number(),
    privacy: z.boolean(),
    privacyTimestamp: z.number(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// types:

export type Contact = z.infer<typeof contactSchema>;

// data:

export const mock = (idField = "id") => ({
  [idField]: ulid() as string,
  accountId: ulid() as string,
  accountDomain: faker.internet.domainName(),
  name: faker.person.fullName(),
  image: faker.image.avatar(),
  position: faker.person.jobTitle(),
  department: faker.person.jobArea(),
  phones: [
    {
      name: "Work",
      value: faker.phone.number(),
    },
    {
      name: "Personal",
      value: faker.phone.number(),
    },
  ],
  emails: [
    {
      name: "Work",
      value: faker.internet.email().toLowerCase(),
    },
    {
      name: "Personal",
      value: faker.internet.email().toLowerCase(),
    },
  ],
  links: [
    {
      name: "website",
      value: faker.internet.url(),
    },
    {
      name: "facebook",
      value: faker.internet.url(),
    },
    {
      name: "linkedin",
      value: faker.internet.url(),
    },
    {
      name: "twitter",
      value: faker.internet.url(),
    },
    {
      name: "other",
      value: faker.internet.url(),
    },
  ],
  notes: Array.from(Array(3)).map(() => ({
    text: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })),
  consent: {
    documents: faker.datatype.boolean(),
    documentsTimestamp: faker.number.int(),
    marketing: faker.datatype.boolean(),
    marketingLastTimestamp: faker.number.int(),
    terms: faker.datatype.boolean(),
    termsTimestamp: faker.number.int(),
    privacy: faker.datatype.boolean(),
    privacyTimestamp: faker.number.int(),
  },
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

// i18n:

export const I18N = {
  id: "Contact ID",
  accountId: "Account ID",
  accountDomain: "Account Domain",
  name: "Full Name",
  image: "Image",
  position: "Position",
  department: "Department",
  phones: "Phones",
  emails: "Emails",
  links: "Links",
  notes: {
    text: "Text",
    createdAt: "Created At",
    updatedAt: "Updated At",
  },
  consent: {
    documents: "Documents",
    documentsTimestamp: "Documents Timestamp",
    marketing: "Marketing",
    marketingLastTimestamp: "Marketing Last Timestamp",
    terms: "Terms",
    termsTimestamp: "Terms Timestamp",
    privacy: "Privacy",
    privacyTimestamp: "Privacy Timestamp",
  },
  createdAt: "Created At",
  updatedAt: "Updated At",
};
