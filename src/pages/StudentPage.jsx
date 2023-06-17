import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function StudentPage() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        height: 300,
        width: 300,
      },
      fps: 24,
    });
    scanner.render(success);

    async function success(result) {
      await scanner.clear();
      setScanResult(result);
    }
  }, []);

  return (
    <div className="mt-24 max-h-screen flex flex-col items-center">
      <Typography>Quét mã QR để làm bài</Typography>
      {scanResult ? (
        <div>
          <Link to={scanResult}>
            <Button>Tiếp tục</Button>
          </Link>
        </div>
      ) : (
        <div id="reader" className="max-h-screen"></div>
      )}
    </div>
  );
}

export default StudentPage;
