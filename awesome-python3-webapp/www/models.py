from orm import Model, StringFeild, IntegerField

class User(Model):
    __table__ = 'string'
    id = IntegerField(primary_key=True)
    name = StringFeild()

