/**
 * Современный алгоритм тасования Фишера — Йетса для тасования массива a из n элементов (индексы 0..n-1):
 *     для всех i от n − 1 до 1 выполнить:
 *     j ← случайное число 0 ≤ j ≤ i
 *     обменять местами a[j] и a[i]
 *
 * @param {*[]} arr array of your numbers
 * @param start array shuffle start index
 * @param end array shuffle end index
 */
export function shuffleArray(arr, start = 0, end = arr.length) {
    for (let i = end - 1; i > start; i--) {
        let j = Math.round(Math.random() * (i - start)) + start;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Проверяет массив на уникальность элементов, сравнивает с предыдущим массивом если это необходимо
 * @param {*[]} arr array of your numbers
 * @param previousArr array for comparison
 */
function isUniqueArray(arr, previousArr = []) {
    const currentSet = new Set(arr);
    if (currentSet.size !== arr.length) return false;
    if (previousArr.length > 0) {
        for (let num of currentSet) {
            if (previousArr.includes(num)) return false
        }
    }
    return true
}

/**
 * Принимает массив уникальных чисел для создания перетасованного массива с необходимым количеством повторений
 * @param {*[]} numsArray array of unique numbers of the required length
 * @param count number of repetitions of numbers in an array
 */
function createArrayWithUniqueNumbers(numsArray = Array.from({length: 8}, (_, i) => i), count = 6) {
    let result = []
    for (let i = 0; i < count; i++) {
        let shuffled = numsArray.slice();
        shuffleArray(shuffled);
        result = result.concat(shuffled)
    }
    return result;
}

/**
 * Сортировка массива с уже заданной уникальной последовательностью чисел, чтобы в каждой группе элементов не было
 * повторяющихся значений, с учетом заданного количества уникальных чисел, сохранив первоначальную уникальность
 * @param {*[]} numsArray array of your numbers with Exist unique numbers
 * @param requiredUniqueNumbers length of the required sequence of unique numbers
 * @param existUniqueNumbers length of the current sequence of unique numbers that already exist in the array being
 * checked
 */
function sortArrayWithUniqueNumbers(numsArray, requiredUniqueNumbers = 6, existUniqueNumbers = 8) {
    for (let i = 0; i < numsArray.length; i += requiredUniqueNumbers) {
        const startIndexForExistNum = i - (i % existUniqueNumbers);
        // console.log(`i = ${i}, iFor8 = ${startIndexForExistNum}, строка ${numsArray.slice(startIndexForExistNum, startIndexForExistNum + 8)}`)
        // if (!isUniqueArray(numsArray.slice(startIndexForExistNum, startIndexForExistNum + 8))) {
        //     console.log(`
        // 8 not unique at index ${startIndexForExistNum}
        // `);
        //     shuffleArray(numsArray, startIndexForExistNum, startIndexForExistNum + 8)
        //     i -= 6;
        //     continue
        // }
        if (!isUniqueArray(numsArray.slice(i, i + requiredUniqueNumbers))) {
            shuffleArray(numsArray, startIndexForExistNum, startIndexForExistNum + existUniqueNumbers)
            i -= 6;
        }
    }
}
