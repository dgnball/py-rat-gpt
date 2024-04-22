# PyRatGPT

A demonstration of a chatbot using React, FastAPI and the OpenAI API

![Logo](./logo.png)

Steps used to create the React App

```bash
npx create-react-app ui
npm install axios
```
Steps used to run the React App

```bash
cd ui
npm install
npm start
```
Steps to set up the Fast API server. You will need to spend $5 with OpenAI to get an API key. From there, you can get a secret key to use the API.

```bash
python3.11 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY=secret_key
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```