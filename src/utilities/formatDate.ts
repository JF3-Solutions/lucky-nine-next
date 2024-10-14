// formatDate.ts
export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return new Date(date).toLocaleDateString('es-ES', options);
};
