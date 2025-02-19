import {useState} from "react";

interface DragDropImageProps {
  onImageSelected: (image: string) => void;
}

export function DragDropImage({ onImageSelected }: DragDropImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`drag-drop-zone ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: "none" }}
      />
      {preview ? (
        <div>
          <img src={preview} alt="Preview" className="drag-drop-preview" />
          <p>Click or drag to change image</p>
        </div>
      ) : (
        <div>
          <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
          <p>Click or drag an image here</p>
        </div>
      )}
    </div>
  );
}
