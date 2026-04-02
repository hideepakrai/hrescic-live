import { MongoClient, Db } from "mongodb";
import { CMS_COLLECTIONS } from "@/lib/cms";

const MONGODB_URI = process.env.MONGODB_URI;
const TENANT_DB_NAME = process.env.TENANT_DB_NAME;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

if (!TENANT_DB_NAME) {
  throw new Error(
    "Please define the TENANT_DB_NAME environment variable inside .env"
  );
}

let cachedClient = (global as any).mongoClient;
let cachedIndexPromise = (global as any).mongoIndexPromise as Promise<void> | undefined;

if (!cachedClient) {
  cachedClient = (global as any).mongoClient = { conn: null, promise: null };
}

async function ensureCoreIndexes(client: MongoClient): Promise<void> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = (async () => {
      const tenantDb = client.db(TENANT_DB_NAME as string);

      const leads = tenantDb.collection("leads");
      await Promise.all([
        leads.createIndex({ createdAt: -1 }),
        leads.createIndex({ status: 1, createdAt: -1 }),
        leads.createIndex({ formType: 1, createdAt: -1 }),
      ]);

      const auditLogs = tenantDb.collection("audit_logs");
      await Promise.all([
        auditLogs.createIndex({ createdAt: -1 }),
        auditLogs.createIndex({ entityType: 1, createdAt: -1 }),
      ]);

      await Promise.all(
        CMS_COLLECTIONS.map(async (collectionName) => {
          const collection = tenantDb.collection(collectionName);
          await Promise.all([
            collection.createIndex(
              { key: 1 },
              {
                unique: true,
                partialFilterExpression: { key: { $exists: true, $ne: "" } },
              },
            ),
            collection.createIndex(
              { slug: 1 },
              {
                unique: true,
                partialFilterExpression: { slug: { $exists: true, $ne: "" } },
              },
            ),
          ]);
        }),
      );
    })();

    (global as any).mongoIndexPromise = cachedIndexPromise;
  }

  await cachedIndexPromise;
}

export async function connectClient(): Promise<MongoClient> {
  if (cachedClient.conn) return cachedClient.conn;

  if (!cachedClient.promise) {
    cachedClient.promise = MongoClient.connect(MONGODB_URI as string);
  }
  
  try {
    cachedClient.conn = await cachedClient.promise;
  } catch (e) {
    cachedClient.promise = null;
    throw e;
  }

  await ensureCoreIndexes(cachedClient.conn);

  return cachedClient.conn;
}

export async function connectMasterDB(): Promise<Db> {
  const client = await connectClient();
  return client.db("kalp_master");
}

export async function connectTenantDB(): Promise<Db> {
  const client = await connectClient();
  return client.db(TENANT_DB_NAME);
}
