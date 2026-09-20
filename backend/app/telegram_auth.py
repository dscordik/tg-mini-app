import hashlib
import hmac
from urllib.parse import parse_qsl
import json

def verify_init_data(init_data:str, bot_token:str)->dict|None:
    verify = parse_qsl(init_data)
    data_dict = dict(verify)
    received_hash = data_dict.pop('hash')
    sorted_mass = sorted(data_dict.items())
    data_check_string = '\n'.join(f'{key}={value}' for key, value in sorted_mass)
    secret_key = hmac.new(
        key=b"WebAppData",
        msg=bot_token.encode(),
        digestmod=hashlib.sha256
    ).digest()
    computed_hash = hmac.new(
        key=secret_key,
        msg=data_check_string.encode(),
        digestmod=hashlib.sha256
    ).hexdigest()
    war = hmac.compare_digest(computed_hash, received_hash)
    if not war:
        return None
    else:
        return json.loads(data_dict['user'])