from orm import Model, StringFeild, BooleanField, FloatField, TextField
import time, uuid

def next_id():
    return '%015d%s000' %(int(time.time() * 1000), uuid.uuid4().hex)

class User(Model):
    __table__ = 'string'
    id = IntegerField(primary_key=True, default-next_id, ddl='varchar(50)')
    email = StringFeild(ddl='varchar(50)')
    passwd = StringFeild(ddl='varchar(50)')
    admin = BooleanField()
    name = StringFeild(ddl='varchar(50)')
    image = StringFeild(ddl='varchar(50)')
    created_at = FloatField(default=time.time)

class Blog(Model):
    __table__ = 'blog'

    id = StringFeild(primary_key=True, default = next_id, ddl='varchar(50)')
    user_id = StringFeild(ddl='varchar(50)')
    user_name = StringFeild(ddl='varchar(50)')
    user_image = StringFeild(ddl='varchar(50)')
    name = StringFeild(ddl='varchar(50)')
    summary = StringFeild('varchar(50)')
    content = TextField()
    created_at = FloatField(default=time.time)

class Comment(Model):
    __table__ = 'comments'

    id = StringFeild(primary_key=True, default=next_id, ddl='varchar(50)')
    blog_id = StringFeild(ddl='varchar(50)')
    user_name = StringFeild(ddl='varchar(50)')
    user_image = StringFeild(ddl='varchar(500)')
    content = TextField()
    created_at = FloatField(default=time.time)



    
