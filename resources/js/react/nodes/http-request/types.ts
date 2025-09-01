import { BaseNodeData, KeyValuePairSchema } from "../../types";
import { z } from "zod";

export const HttpConfigSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  url: z.string().url("Invalid URL format"),
  queryParams: z.array(KeyValuePairSchema),
   headers: z.array(KeyValuePairSchema),
   body: z
    .object({
      contentType: z.string(),
      content: z.string(),
    })
    .optional(),
  options: z.object({
    followRedirects: z.boolean().optional(),
    verifySSL: z.boolean().optional(),
  }),
  auth: z.object({
    type: z.enum(['none', 'basic', 'bearer']),
    username: z.string().optional(),
    password: z.string().optional(),
    token: z.string().optional(),
  }),

})

// Infer TS type from Zod
export type HttpConfig = z.infer<typeof HttpConfigSchema>;

export interface HttpRequestNodeData extends BaseNodeData<HttpConfig> {}

