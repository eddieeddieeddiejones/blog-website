
import re, time, json, logging, hashlib, base64, asyncio
from coreweb import get, post
from models import User, Comment, Blog, next_id

@get('/')
async def index(request):
    blogs=[
        Blog(id=1, name='test blog', summary='我是一个简介', created_at=time.time()-120),
        Blog(id=2, name='test blog', summary='我是一个简介', created_at=time.time() - 3600),
        Blog(id=3, name='test blog', summary='我是一个简介', created_at=time.time() - 7020),
        Blog(id=4, name='test blog', summary='我是一个简介', created_at=time.time() - 10400),

    ]
    return {
        '__template__': 'blogs.html',
        'blogs': blogs
    }
