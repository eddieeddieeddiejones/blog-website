
import re, time, json, logging, hashlib, base64, asyncio
from coreweb import get, post
from models import User, Comment, Blog, next_id

@get('/')
async def index(request):
    users = await User.findAll()
    logging.info('users: %s' % users)
    return {
        '__template__': 'test.html',
        # 'users': users
        'a': 1
    }
