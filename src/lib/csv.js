const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function convertCsv(text) {
  let result = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        result += '""';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      result += char;
    } else if (char === ';' && !inQuotes) {
      result += ',';
    } else {
      result += char;
    }
  }

  return result;
}

export function validateCsvFile(file) {
  if (!file) {
    return { valid: false, error: 'Selecciona un archivo CSV.' };
  }

  const isCsv =
    file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv';
  if (!isCsv) {
    return { valid: false, error: 'El archivo debe tener extensión .csv.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'El archivo supera el tamaño máximo de 25 MB.' };
  }

  return { valid: true, error: null };
}
