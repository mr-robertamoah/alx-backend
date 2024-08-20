#!/usr/bin/env python3
"""
contains an index_range function
"""


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    returns the start index and end indexes on a page which
    corresponds to the list of parameters
    """
    return ((page - 1) * page_size, page_size * page)
