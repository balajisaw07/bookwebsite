import { FileInput, Label } from "flowbite-react";

export function ImageInput() {
  return (
    <div>
      <div>
        <Label htmlFor="file-upload-helper-text" value="Upload Image" />
      </div>
      <FileInput id="file-upload-helper-text" helperText="PNG, JPG or JPEG (MAX. 800x400px)." />
    </div>
  );
}

export default ImageInput;