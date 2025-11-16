# voice-n8n-rag-assistant

音声入力 × n8n × RAG を連携させた対話型アシスタントのテンプレートです。  
音声 → テキスト化 → RAG検索 → 回答生成 → Web UI出力 までを自動化します。

社内ヘルプデスク、FAQ対応、業務改善支援、社内ナレッジ参照AI などにそのまま展開できる構成です。

---

## 🚀 特徴

- **音声入力（Web Speech API）** に対応  
- **n8n ワークフロー** で自動的に LLM へ問い合わせ  
- **RAG（AnythingLLM）** により社内ナレッジを参照  
- **Webhook レスポンスで即時回答**  
- **テンプレート化しやすい構成** で他社導入も容易  
- **LINE BOT などにも拡張可能**（Webhook 部分を変更するだけ）

---

## 🏗 アーキテクチャ

Web UI（音声） → n8n（Webhook）
→ AnythingLLM（RAG回答生成）
→ n8n（加工） → Webhook レスポンス → UIへ返す

yaml
コードをコピーする

---

## 📁 ディレクトリ構成

/
├─ frontend/ # 音声収録 & レスポンス表示のUI
├─ n8n-workflow/ # n8n のワークフローJSON
├─ rag-docs/ # AnythingLLM 用のドキュメント
└─ README.md

yaml
コードをコピーする

---

## 🔧 動作環境

- Docker / Docker Compose  
- n8n（self-host）  
- AnythingLLM（self-host）  
- Node.js（任意 / Web UI用途）

---

## 🛠 導入手順

### 1. n8n と AnythingLLM を起動
docker compose up -d

yaml
コードをコピーする

### 2. n8n ワークフローをインポート  
`n8n-workflow/voice-assistant.json` を n8n に読み込む。

### 3. AnythingLLM に社内ナレッジを登録  
`rag-docs/` 内の資料をアップロード。

### 4. Web UI を開く  
`frontend/index.html` をブラウザで開けば音声対話が可能。

---

## 📦 応用・拡張

- LINE BOT / Slack BOT への拡張  
- 業務マニュアル検索  
- 問い合わせ対応の半自動化  
- 面談補助AI  
- 社内FAQボット

---

## 📄 ライセンス

本リポジトリは MIT ライセンスで公開しています。
