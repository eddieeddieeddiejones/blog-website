
def get(path):

    '''
    Define docorator @get('/path')
    '''

    def decorator(func):
        @functools.wrap(func)
        def wrapper(*args, **kw):
            return func(*args, **kw)
        wrapper.__method__ = 'GET'
        wrapper.__route__ = path
        return wrapper
    return decorator


class RequestHandler(object):

    def __init__(self, app, fn):
        self.app = app
        self.__func = fn

    @asyncio.coroutine
    def __call__(self, request):
        r = yield from self._func(**kw)
        return r

