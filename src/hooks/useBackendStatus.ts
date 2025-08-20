import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export function useBackendStatus() {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Waking up backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${API_BASE_URL}/songs`);
        setIsBackendReady(true);
      } catch {
        setLoadingMessage("Backend is still waking up...");
        setTimeout(checkBackend, 3000);
      }
    };

    checkBackend();
  }, []);

  return { isBackendReady, loadingMessage };
}
