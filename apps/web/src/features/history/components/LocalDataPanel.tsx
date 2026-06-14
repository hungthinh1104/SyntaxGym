import { useRef, useState } from "react";
import { 
  createExportData, 
  validateExportData, 
  importExportData, 
  clearAllLocalData,
  type SyntaxGymExport 
} from "@syntaxgym/storage";
import { localDateString } from "@syntaxgym/shared";
import { ui } from "../../../lib/ui";

export function LocalDataPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<SyntaxGymExport | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  async function handleExport() {
    setIsExporting(true);
    setError(null);
    try {
      const data = await createExportData();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `syntaxgym-export-${localDateString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to export data.");
    } finally {
      setIsExporting(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    setPreview(null);
    
    // Guard against massive files (e.g., > 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Import file is too large (max 5MB).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);
        const validData = validateExportData(json);
        setPreview(validData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON file.");
      } finally {
        // Reset file input so user can select the same file again if they cancel
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  }

  async function handleConfirmImport() {
    if (!preview) return;
    setIsImporting(true);
    setError(null);
    try {
      await importExportData(preview);
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to import data.");
      setIsImporting(false);
    }
  }

  function handleCancelImport() {
    setPreview(null);
    setError(null);
  }

  async function handleClearData() {
    if (window.confirm("Are you sure you want to delete all local history, custom snippets, and daily progress? This cannot be undone.")) {
      try {
        await clearAllLocalData();
        window.location.reload();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to clear data.");
      }
    }
  }

  return (
    <div className={ui.panel + " flex flex-col gap-16 border-sst-ink/20 bg-paper"}>
      <div className="flex flex-col">
        <h3 className={ui.headingSm + " flex items-center gap-8 mb-4"}>
          <span>💾</span> Local Data
        </h3>
        <p className={ui.body + " text-[13px]"}>Your data stays in this browser unless you export it.</p>
      </div>

      <div className="flex flex-wrap gap-8">
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={ui.ghostButton + " bg-sst-ink text-paper hover:bg-slate border-transparent hover:text-paper px-12 py-6"}
        >
          {isExporting ? "Exporting..." : "Export JSON"}
        </button>
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className={ui.ghostButton + " border-sst-ink px-12 py-6"}
        >
          Import JSON
        </button>
        <input 
          type="file" 
          accept=".json,application/json" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </div>

      {error && (
        <div className="p-8 bg-red-50 text-red-600 rounded text-caption border border-red-200">
          {error}
        </div>
      )}

      {preview && (
        <div className="flex flex-col gap-8 bg-lavender-mist/50 border border-lavender-mist rounded p-12 mt-8">
          <strong className="text-body font-semibold">Ready to import?</strong>
          <p className="text-caption text-slate mb-4">This will replace your current local data.</p>
          <ul className="text-caption text-sst-ink font-ibm-plex-mono flex flex-col gap-4 list-disc list-inside mb-8">
            <li>{preview.data.history.length} history entries</li>
            <li>{preview.data.customSnippets.length} custom snippets</li>
            <li>{preview.data.dailyDrillProgress ? "Includes" : "No"} daily progress</li>
          </ul>
          <div className="flex gap-8 mt-4">
            <button 
              onClick={handleConfirmImport} 
              disabled={isImporting}
              className={ui.ghostButton + " border-sst-ink py-4 px-12"}
            >
              {isImporting ? "Importing..." : "Confirm Import"}
            </button>
            <button 
              onClick={handleCancelImport} 
              disabled={isImporting}
              className={ui.ghostButton + " py-4 px-12 border-transparent text-mist hover:text-sst-ink hover:bg-transparent"}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="pt-16 border-t border-lavender-mist/50 mt-8">
        <button 
          onClick={handleClearData}
          className="text-caption text-code-plum hover:text-red-700 hover:underline transition-colors font-medium"
        >
          Clear all local data
        </button>
      </div>
    </div>
  );
}
