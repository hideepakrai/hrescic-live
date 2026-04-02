import { connectMasterDB, connectTenantDB } from "../lib/db";
import { CmsCollection } from "@/lib/cms";

export const getUserModel = async () => {
  const db = await connectMasterDB();
  return db.collection("users");
};

export const getTenantsCollection = async () => {
  const db = await connectMasterDB();
  return db.collection("tenants");
};

export const getCategoryModel = async () => {
  const db = await connectTenantDB();
  return db.collection("categories");
};

export const getAttributeSetModel = async () => {
  const db = await connectTenantDB();
  return db.collection("attribute_sets");
};

export const getProductModel = async () => {
  const db = await connectTenantDB();
  return db.collection("products");
};

export const getVariantModel = async () => {
  const db = await connectTenantDB();
  return db.collection("variants");
};

export const getOrderModel = async () => {
  const db = await connectTenantDB();
  return db.collection("orders");
};

export const getLeadModel = async () => {
  const db = await connectTenantDB();
  return db.collection("leads");
};

export const getAuditLogModel = async () => {
  const db = await connectTenantDB();
  return db.collection("audit_logs");
};

export const getCmsCollectionModel = async (collection: CmsCollection) => {
  const db = await connectTenantDB();
  return db.collection(collection);
};
