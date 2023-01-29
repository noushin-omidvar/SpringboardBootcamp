def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    if (not parens.count('(') == parens.count(')')) or (parens[0] == ')'):
        return False

    counter = 0

    for p in parens:
        if p == '(':
            counter += 1
        else:
            counter -= 1

    if counter == 0:
        return True

    else:
        return False
