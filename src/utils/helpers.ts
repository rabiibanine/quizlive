type IdStorageKey = "professorId" | "studentId";

type UUID = ReturnType<typeof crypto.randomUUID>;

export const getOrCreateId = (key: IdStorageKey): UUID => {
  const existing = localStorage.getItem(key);
  if (existing) return existing as UUID;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
};
