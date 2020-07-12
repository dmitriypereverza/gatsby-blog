import React from "react";

export enum FileAccept {
  ALL = "*",
  IMAGE = ".jpeg, .jpg, .png, .bmp",
}

interface FileInterface {
  accept?: FileAccept;
  maxSize?: number;
  onFileLoaded: (file: File) => void;
  view: (openDialog: () => void) => JSX.Element;
}

const FileComponent = ({
  maxSize,
  accept,
  view,
  onFileLoaded,
}: FileInterface) => {
  const file = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    file.current = document.createElement("input");
    file.current.accept = accept;
    file.current.type = "file";
    file.current.style.display = "none";
    file.current.onchange = (event) => {
      const selectedFile = (event.target as HTMLInputElement).files[0];
      if (!selectedFile) return;
      file.current.value = "";
      if (maxSize && selectedFile.size > maxSize) return;
      onFileLoaded(selectedFile);
    };
    document.body.appendChild(file.current);
    return () => document.body.removeChild(file.current);
  }, []);

  return view(() => file.current && file.current.click());
};

FileComponent.defaultProps = {
  accept: FileAccept.ALL,
};

export default React.memo(FileComponent);
