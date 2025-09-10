import { Node } from "@xyflow/react";
import React from "react";
import {z} from "zod";

export type ExecutionStatus = 'Pending' | 'Running' | 'Completed' | 'Failed';

export type RecordUnknown = Record<string, unknown>;

export interface BaseNodeData<T extends RecordUnknown = RecordUnknown> extends RecordUnknown {
  view: NodeView;
  executionStatus?: ExecutionStatus;
  config: T;
  result: any
}

export interface NodeView {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  type: NodeTypes;
  name: string
}


export const KeyValuePairSchema = z.object({
  key: z.string(),
  value: z.string()
})

export type NodeTypes = 'trigger' | 'httpRequest' | 'notification' | 'crm' | 'condition' | 'schedule';

export interface NodeType extends Node<BaseNodeData<RecordUnknown>, NodeTypes> {}

// Notification Configuration
// export interface NotificationConfig extends RecordUnknown {
//   type: 'email' | 'slack' | 'sms' | 'webhook';
//   recipients: KeyValuePair[];
//   subject?: string;
//   message: string;
//   template?: string;
//   enableLogging?: boolean;
//   autoRetry?: boolean;
// }

// export const NotificationConfigSchema = z.object({
//   type: z.enum(['email', 'slack', 'sms', 'webhook']),
//   configuration: z.object({
//     credential: z.string().optional(),
//     recipients: z.array(KeyValuePairSchema).optional(),
//     fromEmail: z.email().optional().nullable(),
//     webhookUrl: z.url().optional().nullable(),
//     toEmail: z.email().optional().nullable(),
//     subject: z.string().optional().nullable(),
//     message: z.string().min(1, "Message is required"),
//     template: z.string().optional().nullable(),
//   })
//   // enableLogging: z.boolean().optional().nullable(),
//   // autoRetry: z.boolean().optional().nullable()
// })


const SlackConfigSchema = z.object({
  type: z.literal("slack"),
  configuration: z.object({
    webhookUrl: z.string().url(),
    message: z.string().min(1, "Message is required"),
  }),
});

const EmailConfigSchema = z.object({
  type: z.literal("smtp"),
  configuration: z.object({
    credentialId: z.string(),
    recipients: z.array(KeyValuePairSchema).nullable(),
    fromEmail: z.email().min(1,"From Email is required"),
    toEmail: z.email().min(1,"To Email is required"),
    subject: z.string().optional().nullable(),
    body: z.string().min(1, "Message is required"),
    template: z.string().optional().nullable(),
  }),
});

const WebhookConfigSchema = z.object({
  type: z.literal("webhook"),
  configuration: z.object({
    credentialId: z.string(),
    webhookUrl: z.string().url().optional().nullable(),
    message: z.string().min(1, "Message is required"),
  }),
});

const SmsConfigSchema = z.object({
  type: z.literal("sms"),
  configuration: z.object({
    credentialId: z.string(),
    recipients: z.array(KeyValuePairSchema).min(1, "At least one recipient required"),
    message: z.string().min(1, "Message is required"),
  }),
});

export const NotificationConfigSchema = z.discriminatedUnion("type", [
  SlackConfigSchema,
  EmailConfigSchema,
  WebhookConfigSchema,
  SmsConfigSchema,
]);
export type NotificationConfig = z.infer<typeof NotificationConfigSchema>

export const CredentialConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(['smtp', 'slack', 'sms', 'webhook']),
  credentials: z.object({
    host: z.string().min(1, "host is required"),
    port: z.string(),
    encryption: z.string(),
    username: z.string(),
    password: z.string(),
  })
})
export type CredentialConfig = z.infer<typeof CredentialConfigSchema>


export const CrmConfigSchema = z.object({
  provider: z.enum(['hubspot', 'salesforce', 'pipedrive', 'zoho']),
  action: z.enum(['create', 'update', 'get', 'delete', 'search']),
  object: z.enum(['contact', 'company', 'deal', 'ticket', 'product']),
  fields: z.array(KeyValuePairSchema),
  apiKey: z.string().min(1, "API Key is required"),
  enableLogging: z.boolean(),
  autoRetry: z.boolean()
})

export type CrmConfig = z.infer<typeof CrmConfigSchema>

export const conditionConfigSchema = z.object({
  leftValue: z.string().min(1, "Left value is required"),
  rightValue: z.string().min(1, "Right value is required"),
  operator: z.object({
    type: z.enum(["string", "number", "boolean"]),
    operation: z.enum([
      "equals",
      "not_equals",
      "greater_than",
      "less_than",
      "contains",
    ]),
  }),
});

// Infer TS type from Zod
export type ConditionConfig = z.infer<typeof conditionConfigSchema>;


// export const ScheduelConfigSchema = z.object({
//   interval: z.enum(['seconds', 'minutes', 'hours', 'days', 'weeks', 'months']),
//   secondsBetween: z.string(),
//   minutesBetween: z.string(),
//   hoursBetween: z.string(),
//   daysBetween: z.string(),
//   weeksBetween: z.string(),
//   monthsBetween: z.string(),
//   triggerAtHour: z.enum(['1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am']),
//   triggerAtMinute: z.string(),
//   triggerAtDay: z.enum(['monday', 'tuesday', 'wedneday', 'thursday', 'friday', 'saturday', 'sunday']),
//   triggerAtDate: z.string()
//   // cronExpression: z.string().min(1, "Cron expression is required"),
//   // timezone: z.string().min(1, "Timezone is required"),
// })

export const ScheduelConfigSchema = z.discriminatedUnion("interval", [
  // SECONDS
  z.object({
    interval: z.literal("seconds"),
    action: z.string().min(1, "Action is required"),
    dateTime: z.string(),
    isRecuring: z.boolean(),
    secondsBetween: z.string().min(1, "Seconds are required"),
  }),

  // MINUTES
  z.object({
    interval: z.literal("minutes"),
    isRecuring: z.boolean(),
    dateTime: z.string(),
    action: z.string().min(1, "Action is required"),
    minutesBetween: z.string().min(1, "Minutes are required"),
  }),

  // HOURS
  z.object({
    interval: z.literal("hours"),
    dateTime: z.string(),
    isRecuring: z.boolean(),

    action: z.string().min(1, "Action is required"),
    hoursBetween: z.string().min(1, "Hours are required"),
    // triggerAtMinute: z.string().min(1, "Trigger at minute is required"),
  }),

  // DAYS
  z.object({
    interval: z.literal("days"),
    dateTime: z.string(),
    isRecuring: z.boolean(),

    action: z.string().min(1, "Action is required"),
    daysBetween: z.string().min(1, "Days are required"),
    // triggerAtHour: z.enum([
    //   "1am","2am","3am","4am","5am","6am","7am","8am","9am"
    // ]),
    // triggerAtMinute: z.string().min(1, "Trigger at minute is required"),
  }),

  // WEEKS
  z.object({
    interval: z.literal("weeks"),
    dateTime: z.string(),
    isRecuring: z.boolean(),
    action: z.string().min(1, "Action is required"),
    weeksBetween: z.string().min(1, "Weeks are required"),
    // triggerAtDay: z.enum([
    //   "monday","tuesday","wedneday","thursday","friday","saturday","sunday"
    // ]),
    // triggerAtHour: z.enum([
    //   "1am","2am","3am","4am","5am","6am","7am","8am","9am"
    // ]),
    // triggerAtMinute: z.string().min(1, "Trigger at minute is required"),
  }),

  // MONTHS
  z.object({
    interval: z.literal("months"),
    dateTime: z.string(),
    isRecuring: z.boolean(),
    action: z.string().min(1, "Action is required"),
    monthsBetween: z.string().min(1, "Months are required"),
    // triggerAtDate: z.string().min(1, "Date is required"),
    // triggerAtHour: z.enum([
    //   "1am","2am","3am","4am","5am","6am","7am","8am","9am"
    // ]),
    // triggerAtMinute: z.string().min(1, "Trigger at minute is required"),
  }),
]);


export type ScheduelConfig = z.infer<typeof ScheduelConfigSchema>

export interface ScheduelNodeData extends BaseNodeData<ScheduelConfig> {}

export interface NotificationNodeData extends BaseNodeData<NotificationConfig> {}


export interface CrmNodeData extends BaseNodeData<CrmConfig> {}

export interface ConditionNodeData extends BaseNodeData<ConditionConfig> {}

export interface TriggerNodeData extends BaseNodeData<RecordUnknown> {}


export interface KeyValuePair {
  key: string;
  value: string;
}



// Node menu item for sidebar
export interface NodeMenuItem {
  label: string;
  name?: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  type: NodeTypes;
}


// Constants
export const NODE_TYPES = {
  TRIGGER: 'trigger' as const,
  HTTP_REQUEST: 'httpRequest' as const,
  NOTIFICATION: 'notification' as const,
  CRM: 'crm' as const,
  CONDITION: 'condition' as const,
  SCHEDULE: 'schedule' as const,
} as const;

export const HTTP_METHODS = {
  GET: 'GET' as const,
  POST: 'POST' as const,
  PUT: 'PUT' as const,
  DELETE: 'DELETE' as const,
  PATCH: 'PATCH' as const,
} as const;

export const AUTH_TYPES = {
  NONE: 'none' as const,
  BASIC: 'basic' as const,
  BEARER: 'bearer' as const,
} as const;
