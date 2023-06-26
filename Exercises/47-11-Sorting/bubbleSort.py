def bubbleSort(arr):
    """
    Given an array, bubbleSort will sort the values in the array

    :type arr : List
    :rtype arr: List
    """

    for i in range(len(arr)):
        for j in range(len(arr)-i - 1):

            if arr[j]>arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

    print(arr)
    return arr

bubbleSort([4, 20, 12, 10, 7, 9]) # [4, 7, 9, 10, 12, 20]
bubbleSort([0, -10, 7, 4]) # [-10, 0, 4, 7]
bubbleSort([1, 2, 3])# [1, 2, 3]
bubbleSort([])

nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34,
    23, 2, 453, 546, 75, 67, 4342, 32
]

bubbleSort(nums)
print('hello')