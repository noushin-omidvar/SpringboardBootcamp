import random


def quickSort(arr):
    sorted_arr = _quickSort(arr, 0, len(arr) - 1)
    print(sorted_arr)
    return sorted_arr

def _quickSort(arr, low, high):
    if low < high:
        pivot_index = pivot(arr, low, high)
        _quickSort(arr, low, pivot_index - 1)
        _quickSort(arr, pivot_index + 1, high)
    
    return arr

def pivot(arr, low, high):
    pivot_index = random.randint(low, high)  # Choose a random pivot index
    pivot = arr[pivot_index]
    swap_idx = low
    arr[pivot_index], arr[high] = arr[high], arr[pivot_index]  # Move pivot to the end

    for i in range(low, high):
        if arr[i] < pivot:
            arr[i], arr[swap_idx] = arr[swap_idx], arr[i] 
            swap_idx += 1

    arr[swap_idx], arr[high] = arr[high], arr[swap_idx]  # Move pivot to its correct position
    
    return swap_idx

quickSort([4, 20, 12, 10, 7, 9])# [4, 7, 9, 10, 12, 20]
quickSort([0, -10, 7, 4])# [-10, 0, 4, 7]
quickSort([1, 2, 3])# [1, 2, 3]
quickSort([])

nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23,
    2, 453, 546, 75, 67, 4342, 32
]

quickSort(nums)# [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34,
            #  35, 43, 67, 75, 232, 232, 453, 546, 4342]