import httpx
from app.config import BOT_TOKEN

def send_telegram_message(chat_id: int, text: str) -> None:
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    payload = {'chat_id': chat_id, 'text': text}
    try:
        response = httpx.post(url, json=payload, timeout=5.0)
        response.raise_for_status()
    except Exception as error:
        print(f'Не удалось отправить сообщение в Telegram для chat_id={chat_id}: {error}')