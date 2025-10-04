import Papa from "papaparse";

export const pickCsvFile = (): Promise<File> =>
  new Promise((resolve, reject) => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = ".csv,text/csv";
    picker.style.display = "none";

    picker.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0] ?? null;
      document.body.removeChild(picker);

      if (!file) {
        reject("Error selecting file");
        return;
      }
      resolve(file);
    };

    document.body.appendChild(picker);
    picker.click();
  });

export const parseCsv = (file: File): Promise<Record<string, unknown>[]> =>
  new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      worker: true,
      complete: (results) => resolve((results.data || []).filter(Boolean)),
      error: (err) => reject(err),
    });
  });
