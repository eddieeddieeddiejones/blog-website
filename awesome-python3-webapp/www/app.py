import logging; logging.basicConfig(level=logging.INFO)

import asyncio, os, json, time
from datetime import datetime

from aiohttp import web
import orm

# 测试代码开始
# from models import User, Blog, Comment

# def test():
#     yield from orm.create_pool(user='root', password='cft6vgy7', database='awesome')
#
#     u = User(name='Test', email='test@example.com', passwd='1234567890', image='about:blank')
#
#     yield from u.save()
#
# for x in test():
#     pass
# 测试代码结束

def index(request):
    # return web.Response(body=b'<h1>awesome</h1>')
    return web.Response(text='awesome')

@asyncio.coroutine
def init(loop):
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/', index)
    srv = yield from loop.create_server(app.make_handler(), '127.0.0.1', 9000)
    logging.info('server started at http://127.0.0.1:9000...')
    return srv

loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()

