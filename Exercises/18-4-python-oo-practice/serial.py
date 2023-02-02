"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """Make a new generator, starting at start."""
        self.next = self.start = start

    def generate(self):
        "Generate serial with starting point of start"

        self.next += 1
        return self.next - 1

    def reset(self):
        "Reset serial with starting point of start"
        self.next = self.start
        return

    def __repr__(self):
        """Show representation."""
        return f"< SerialGenerator start = {self.start} next = {self.next} >"
