/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import PDFViewer from "../../components/PDFViewer";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
// import { Highlight } from "prism-react-renderer";
const url = "http://98.84.189.252:8080";
// const url = "https://pdf-chat-bot-v2-server.onrender.com"
// const url = "http://127.0.0.1:8080";

function Main() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);
  const [isDoneProcessing, setIsDoneProcessing] = useState(false);
  const [fileStatus, setFileStatus] = useState("Choose a PDF file...");

  const processFile = async () => {
    const formData = new FormData();
    formData.append("file", file); // selectedFile is the uploaded file
    setFileStatus(`Received PDF file named ${file.name}`);
    try {
      setFileStatus("Reading PDF file...");
      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });

      console.log(response.data);
      if (response.data.message == "Processed successfully") {
        setIsDoneProcessing(true);
        setFileStatus("PDF file processed succesfully...");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onChatHandler = async (e) => {
    e.preventDefault();
    setHistory([
      ...history,
      {
        role: "user",
        content: msg,
      },
    ]);

    const formData = new FormData();
    formData.append(
      "history",
      JSON.stringify([
        ...history,
        {
          role: "user",
          content: msg,
        },
      ])
    );
    formData.append("message", msg);
    formData.append("file", file); // selectedFile is the uploaded file

    try {
      const response = await axios.post(`${url}/send-msg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });

      setHistory(response.data.history);
      setMsg("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-auto w-screen flex flex-col items-center bg-slate-950  ">
      {/* <form onSubmit={submitHandler} className="w-3/5 flex flex-col">
        <input type="file" onChange={onFileChange} />
        <button type="submit">Submit</button>
      
        
      </form> */}

      <div className="z-20 mt-20">
        <span className="mx-auto mb-3 block w-fit rounded bg-gradient-to-br from-slate-800 to-slate-950 p-3 text-3xl shadow-md shadow-indigo-900">
          <FiZap style={{ color: "white" }} />
        </span>
        <h2 className="mb-3 text-center text-3xl font-semibold leading-tight sm:text-[3em] tracking-[.1em] text-white">
          PDFinder
        </h2>
        <p className="mb-6 text-center text-base leading-snug text-slate-400 sm:text-lg sm:leading-snug md:text-xl md:leading-snug">
          Your intelligent assistant for unraveling knowledge <br/>hidden within
          every page of your PDFs.
        </p>
      </div>
      <section className="relative w-full  z-20 p-10 md:py-20 flex flex-col md:flex-row px-10 gap-3">
        <PDFViewer
          status={fileStatus}
          setFile={setFile}
          processFile={processFile}
        />
        <div className="flex flex-col w-1/2  pt-6 gap-6 sticky top-0">
          <form
            onSubmit={onChatHandler}
            className="flex flex-col gap-2 border-[1px] border-white rounded-sm p-3"
          >
            <span className="text-[lightgray]">
              Ask a question about your PDF
            </span>
            <input
              onChange={(e) => setMsg(e.target.value)}
              className="border-[1px] border-white w-full text-xl p-2 rounded-sm "
              disabled={!isDoneProcessing}
              value={msg}
            />
          </form>
          <div className="flex flex-col items-center border-[1px] border-white h-[30em] gap-[2em] p-3 overflow-y-scroll rounded-sm hide-scrollbar">
            {history.map((block) => {
              return (
                <div
                  className={`flex w-full gap-3 ${
                    block.role == "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                  key={2}
                >
                  <div
                    className={`p-2  rounded-lg ${
                      block.role == "user"
                        ? "rounded-br-none bg-[gray] text-white"
                        : "rounded-bl-none bg-[lightgray]"
                    }`}
                  >
                    <span>{block.content}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <footer className="text-white border-t-[1px] border-t-white bg-gradient-to-br from-slate-950/50 to-slate-900/80 w-full py-3 flex items-center justify-center">
        Chat With PDF | Built by James Ha <span className="text-[red]">&#10084;</span>
      </footer>
      <BGGrid />
    </div>
  );
}

const BGGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 27 75 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/0 to-slate-950/80" />
      <Beams />
    </div>
  );
};
const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const Beam = ({ top, left, transition = {} }) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-indigo-500/0 to-indigo-500"
    />
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

export default Main;
