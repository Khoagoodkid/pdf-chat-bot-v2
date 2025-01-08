/* eslint-disable react/prop-types */
import { useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import DropBox from "./DropBox";
import { ScrollMode } from '@react-pdf-viewer/core';
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
export const PDFViewer = ({ status, setFile, processFile }) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (selectedFile) => {
    // let selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
      processFile();
    } else {
      setViewPdf(null);
    }
  };
  const scrollModePluginInstance = scrollModePlugin();
  scrollModePluginInstance.SwitchScrollMode(ScrollMode.Page)

  return (
    <div className="container w-full pt-0 ">
      <br></br>

      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <DropBox handlePdfFileChange={handlePdfFileChange} />
        {/* <label htmlFor='file-upload' className="flex flex-col items-center justify-center border-[1px] border-[white] rounded-sm py-20 cursor-pointer" >
            <span>Drop file here</span> 
            <span>-or-</span>
            <span>Click to upload</span>

        </label>
        <input type="file" className='form-control hidden'
          // placeholder=''
          id = 'file-upload'
          required onChange={handlePdfFileChange}
        /> */}
        {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
        <br></br>
        <button
          type="submit"
          className="w-full bg-[lightgray] border-sm py-2 font-[500]"
        >
          Process PDF
        </button>
      </form>
      <br></br>
      <div className="flex flex-col w-full border-[1px] border-white p-3 rounded-sm gap-2 text-[lightgray]">
        <span className="font-bold">Status</span>
        <div className="w-full border-[1px] border-white h-[2.5em] rounded-sm flex items-center p-2">
          {status }
        </div>
      </div>
      <div className="pdf-container mt-5 h-[50em]">
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance,scrollModePluginInstance]}
                theme={"white"}
                // scrollMode={}
              />
            </Worker>
          </>
        )}

        {/* if we dont have pdf or viewPdf state is null */}
      </div>
    </div>
  );
};

export default PDFViewer;
