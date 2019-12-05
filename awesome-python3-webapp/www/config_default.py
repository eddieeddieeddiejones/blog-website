# import sys
# sys.path.append('..')
from password import password

configs = {
    'db': {
        'host': '127.0.0.1',
        'port': 3306,
        'user': 'root',
        'password': password['passwd'],
        'database': 'awesome'
    },
    'session': {
        'secret': password['secret']
    }
}