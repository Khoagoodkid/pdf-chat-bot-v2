/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropBox({ handlePdfFileChange }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
    handlePdfFileChange(acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border-[1px] border-[white] rounded-sm cursor-pointer text-[1.2em] border-dashed h-[17em]"
    >
      <input {...getInputProps()} />
      {file ? (
        <div>
          <span className="text-white font-bold">{file.name}</span>
        </div>
      ) : isDragActive ? (
        <p className="text-[lightgray]">Drop the files here ...</p>
      ) : (
        <>
          <img src="./upload_img.png" className="h-[11em] "/>
          <span className="text-[lightgray]">Drop File Here</span>
          <span className="text-[gray]">- or -</span>
          <span className="text-[lightgray]">Click to Upload</span>
        </>
      )}
    </div>
  );
}

export default DropBox;
