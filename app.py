import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()
origins = [
    "http://localhost:3000",  # React app
    "http://localhost:8000",  # FastAPI server
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_event():
    logger.info("Starting up the application...")


class Question(BaseModel):
    question: str


@app.post("/ask/")
async def ask_gpt(question: Question):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": question.question}
        ]
    )

    print(completion.choices[0].message)
    return completion.json()
