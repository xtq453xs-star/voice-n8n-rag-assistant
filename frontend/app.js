// =========================
// 設定：Webhook URL
// =========================
const WEBHOOK_URL = "http://localhost:5678/webhook/voice";

// ---- Web Speech API ----
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("このブラウザは音声認識(Web Speech API)に対応していません。Chrome をおすすめします。");
}

const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const logEl = document.getElementById("log");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

if (recognition) {
  recognition.lang = "ja-JP";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    statusEl.textContent = "録音中...";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  recognition.onend = () => {
    statusEl.textContent = "停止中";
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  recognition.onerror = (event) => {
    appendLog("[ERROR] 音声認識エラー: " + event.error);
  };

  recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const transcript = last[0].transcript.trim();
    if (!transcript) return;

    appendLog("👤 You: " + transcript);
    sendToN8N(transcript);
  };
}

function appendLog(text) {
  const now = new Date().toLocaleTimeString("ja-JP");
  logEl.textContent += `[${now}] ${text}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

async function sendToN8N(text) {
  try {
    appendLog("➡ n8n へ送信中...");

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    let replyText = "";
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await res.json();
      replyText = json.reply || JSON.stringify(json);
    } else {
      replyText = await res.text();
    }

    appendLog("🤖 Bot: " + replyText);
    speak(replyText);
  } catch (err) {
    appendLog("[ERROR] n8n への送信失敗: " + err.message);
  }
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

startBtn.addEventListener("click", () => recognition && recognition.start());
stopBtn.addEventListener("click", () => recognition && recognition.stop());