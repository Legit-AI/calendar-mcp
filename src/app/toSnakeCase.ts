export const toSnakeCase = (text?: string) =>
  !text
    ? ""
    : text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        .replace(/\s+/g, "_")
        .toLowerCase();
