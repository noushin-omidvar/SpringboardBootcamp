
def print_upper_word(words_list, must_start_with):
    """
    Give list of words and set of letters, 
    prints out each word  that start with 
    one of those letters on a separate line, in all uppercase. 


    For example:

    # this should print "HELLO", "HEY", "YO", and "YES"

    print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                    must_start_with={"h", "y"})
    """

    for word in words_list:
        if word[0] in must_start_with:
            print(word.upper())


print_upper_word(['access', 'jedi', 'happy', 'big'],
                 must_start_with={'a', 's', 'b'})
