type IdStorageKey = "professorId" | "studentId";

export const getOrCreateId = (key: IdStorageKey): string => {
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
};
