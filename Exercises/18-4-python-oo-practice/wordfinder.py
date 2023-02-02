

from random import choice


class WordFinder:
    f"""Word Finder: finds random words from a dictionary.

    >>> wf = WordFinder("words.txt")

    >>> type(wf.random_word())
    <class 'str'>


    >>> wf.random_word() in wf.words_list
    True

    >>> wf.random_word().endswith('\n')
    False

    """

    def __init__(self, path):
        """instantiated with a path to a file on disk that contains words,
         one word per line it reads that file, and
        makes an attribute of a list of those words
        it prints out “[num-of-words-read] words read"""
        self.path = path

        self.words_list = self.parse_file()

    def __repr__(self):
        return f"{len(self.words_list)} words read"

    def random_word(self):
        "Returns a random word from that list of words"
        return choice(self.words_list)

    def parse_file(self):
        "Reads file and store words in word_list"
        words_list = []
        with open(self.path) as f:
            lines = f.readlines()
            for line in lines:
                words_list.append(line.split('\n')[0])
        return words_list
