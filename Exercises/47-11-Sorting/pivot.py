import random
def pivot(arr, low, high):
    pivot_index = 0  # set pivot index as 0 (it can be random too)
    pivot = arr[pivot_index]
    swap_idx = low
    arr[pivot_index], arr[high] = arr[high], arr[pivot_index]  # Move pivot to the end

    for i in range(low, high):
        if arr[i] < pivot:
            arr[i], arr[swap_idx] = arr[swap_idx], arr[i] 
            swap_idx += 1

    arr[swap_idx], arr[high] = arr[high], arr[swap_idx]  # Move pivot to its correct position
    print(swap_idx)
    print(arr)
    return swap_idx



arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3]
arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16]

pivot(arr1, 0,len(arr1)-1)# 3
pivot(arr2, 0,len(arr2)-1)# 4
