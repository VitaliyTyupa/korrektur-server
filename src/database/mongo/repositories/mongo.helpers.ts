export function stripMongoFields<T>(value: T | null): T | null {
  if (!value) {
    return null;
  }

  const plainValue = value as Record<string, any>;
  const { _id, ...rest } = plainValue;
  return rest as T;
}
