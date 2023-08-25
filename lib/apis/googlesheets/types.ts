import { z } from "../deps.ts";

export const valueRangeSchema = z.object({
  range: z.string(),
  majorDimension: z.string(),
  values: z.array(z.array(z.any())),
}).deepPartial();

export const dataAddOrUpdateValuesSchema = z.object({
  values: z.array(z.array(z.string())),
});

export const updateValuesResponseSchema = z.object({
  spreadsheetId: z.string(),
  updatedRange: z.string(),
  updatedRows: z.number(),
  updatedColumns: z.number(),
  updatedCells: z.number(),
  updatedData: valueRangeSchema,
}).deepPartial();

export const addValuesResponseSchema = z.object({
  spreadsheetId: z.string(),
  tableRange: z.string(),
  updates: updateValuesResponseSchema,
}).deepPartial();

export const queryAddOrUpdateValuesSchema = z.object({
  valueInputOption: z.union([z.literal("RAW"), z.literal("USER_ENTERED")]),
  insertDataOption: z
    .union([z.literal("OVERWRITE"), z.literal("INSERT_ROWS")])
    .optional(),
  includeValuesInResponse: z.boolean().optional(),
  responseValueRenderOption: z
    .union([
      z.literal("FORMATTED_VALUE"),
      z.literal("UNFORMATTED_VALUE"),
      z.literal("FORMULA"),
    ])
    .optional(),
  responseDateTimeRenderOption: z
    .union([z.literal("SERIAL_NUMBER"), z.literal("FORMATTED_STRING")])
    .optional(),
});

export const deleteValuesResponseSchema = z.object({
  spreadsheetId: z.string(),
  clearedRange: z.string(),
}).deepPartial();

//types:

export type ValueRange = z.infer<typeof valueRangeSchema>;
export type DataAddOrUpdateValues = z.infer<
  typeof dataAddOrUpdateValuesSchema
>;
export type UpdateValuesResponse = z.infer<typeof updateValuesResponseSchema>;
export type AddValuesResponse = z.infer<typeof addValuesResponseSchema>;
export type QueryAddOrUpdateValues = z.infer<
  typeof queryAddOrUpdateValuesSchema
>;
export type DeleteValuesResponse = z.infer<typeof deleteValuesResponseSchema>;
