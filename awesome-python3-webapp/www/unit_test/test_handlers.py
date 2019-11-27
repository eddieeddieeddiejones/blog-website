import sys
sys.path.append('..')
from handlers import get_page_index

def test_get_page_index():
    assert get_page_index('-10') == 1