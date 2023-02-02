from wordfinder import WordFinder


class SpecialWordFinder(WordFinder):
    f"""Word Finder: finds random words from a dictionary.

    >>> wf_sp = SpecialWordFinder("specialWord.txt", '#', '+', '\n', '.', ' ', ',')

    >>> type(wf_sp.random_word())
    <class 'str'>

    >>> wf_sp.random_word() in wf_sp.words_list
    True

    >>> wf_sp.random_word().endswith('\n')
    False

    >>> wf_sp.random_word().startswith('\n')
    False

    >>> wf_sp.random_word().startswith('#')
    False

    >>> wf_sp.random_word().startswith('+')
    False

    >>> wf_sp.random_word().startswith('.')
    False

    >>> wf_sp.random_word().startswith(' ')
    False

    >>> wf_sp.random_word().startswith(',')
    False
    """

    def __init__(self, path, *special_characters):
        # get parent class [`super()`], call its `__init__()`
        super().__init__(path)
        self.special_characters = special_characters

    def parse_file(self):
        "Reads file and store words in word_list"
        words_list = []
        with open(self.path) as f:
            lines = f.readlines()
            for line in lines:
                words_list.append(line.split('\n')[0])
        return [word for word in self.words_list if not word.startswith(
            tuple(self.special_characters)) and word.strip()]
