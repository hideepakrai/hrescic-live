import { getAuditLogModel } from "@/models";
import { AuthenticatedAdmin } from "@/lib/auth";
import { getRequestContext } from "@/lib/request-context";

export interface AuditEventInput {
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  actor?: AuthenticatedAdmin | null;
  request?: Request | null;
}

export async function logAuditEvent(input: AuditEventInput): Promise<void> {
  try {
    const AuditLog = await getAuditLogModel();
    const context = getRequestContext(input.request);

    await AuditLog.insertOne({
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId || null,
      details: input.details || {},
      actor: input.actor
        ? {
            id: input.actor.id || null,
            email: input.actor.email || null,
            role: input.actor.role,
          }
        : { id: null, email: null, role: "system" },
      request: {
        requestId: context.requestId,
        ip: context.ip,
        userAgent: context.userAgent,
      },
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Audit logging error:", error);
  }
}
