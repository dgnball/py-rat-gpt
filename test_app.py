from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_ask_gpt():
    response = client.post("/ask/", json={"question": "What is your name?"})
    assert response.status_code == 200, response.content
    assert "choices" in response.json()
