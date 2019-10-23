
'''
JSON API definition
'''

import json, logging, inspect, functools


class APIError(Exception):
    ''''
    the base APIError which contains error(required), data(optional), message(optional)
    '''
    def __init__(self, error, data='', message=''):
        pass