import aiomysql

@asyncio.coroutine
def create_pool(loop, **kw):
    logging.info('create database connection pool...')
    golbal _pool
    _pool = yield from aiomysql.create_pool(
        host = kw.get('host', 'localhost'),
        port = kw.get('port', 3306),
        user = kw['user'],
        password = kw['password'],
        db = kw['db'],
        charset = kw.get('charset', 'utf8'),
        autocommit = kw.get('autocommit', True),
        maxsize = kw.get('maxsize', 10),
        minsize = kw.get('minsize', 1),
        loop = loop
    )

@asyncio.coroutine
def select(sql, args, size=None):
    log(sql, args)
    global _pool
    with (yield from _pool) as conn:
        cur = yield from conn.cursor(aiomysql.Dictcursor)
        yield from cur.execute(sql.replace('?', '%s'), args or ())
        if size:
            re = yield from cur.fetchmany(size)
        else:
            rs = yield from cur.fetchall()
        yield from cur.close()
        logging.info('rows returned: %s' % len(rs))
        return rs

@asyncio.coroutine
def execute(sql, args):
    log(sql)
    with (yield from _pool) as conn:
        try:
            cur = yield from conn.cursor()
            yield from cur.execute(sql.replace('?', '%s'), args)
            affected = cur.rowcount
            yield from cur.close()
        except BaseException as e:
            raise
        return affected

class Model(dict, metaclass=ModelMetaclass):

    def __init__(self, **kw):
        super(Model, self).init(**kw)
    def __getattr(self, key):
        try:
            return self[key]
        except keyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)
    def __setattr__(self, key, value):
        self[key] = value

    def getValue(self, key):
        return getattr(self, key, None)

    def getValueOrDefault(self, key):
        value = getattr(self, key, None)
        if value is None:
            field = self.__mappings__[key]
            if field.default is not None:
                value = field.default() if callable(field.default) else field.default
                logging.debug('using default value for %s: %s' % (key, str(value)))
                setattr(self, key, value)
            return value
        
class Field(object):

    def __init__(self, name, column_type, primary_key, default):
        self.name = name
        self.column_type = column_type
        self.primary_key = primary_key
        self.default = default
    
    def __sttr__(self):
        return '<%s, %s:%s>' % (self.__class__.__name__, self.column_type, self.name)

class StringField(Field):
    
    def __init__(self, name=None, primary_key=False, default=None, ddl='varchar(100)'):
        super().__init__(name, ddl, primary_key, default)

class ModelMetaclass(type):

    def __new__(cls, name, bases, attrs):
        if name='model':
            return type.__new__(cls, name, bases, attrs)
        tableName = a

