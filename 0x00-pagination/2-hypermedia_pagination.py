#!/usr/bin/env python3
"""
contains a Server class with methods to retrieve
and paginate a dataset
"""


from typing import Tuple, List
import csv
import math


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    returns the start index and end indexes on a page which
    corresponds to the list of parameters
    """
    return ((page - 1) * page_size, page_size * page)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        return the appropriate page of the dataset
        """
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0

        data = self.dataset()

        try:
            x, y = index_range(page, page_size)

            return data[x:y]
        except IndexError:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        returns a dictionary containing pagination key-value pairs
        """
        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)

        next_page = None
        prev_page = None

        if page < total_pages:
            next_page = page + 1

        if page > 1 and page <= total_pages:
            prev_page = page - 1

        return {'page_size': len(data),
                'page': page,
                'data': data,
                'next_page': next_page,
                'prev_page': prev_page,
                'total_pages': total_pages
                }
