import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Buffer } from 'buffer';
//https://github.com/react-dropzone/react-dropzone
export const ImageUploader = (props: {
  setImageString: (base64ImageString: string) => void;
}) => {
  const { setImageString } = props;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onloadend = () => {
        //https://nodejs.org/api/buffer.html#buffers-and-character-encodings
        const imageBuffer = Buffer.from(reader.result as ArrayBuffer);
        const base64ImageString = imageBuffer.toString('base64');
        setImageString(base64ImageString);
        // console.log(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
