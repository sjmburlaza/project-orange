export function getUniqueObjects<T, K>(data: T[], key: (item: T) => K): T[] {
    return [
      ...new Map<K, T>(
        data.map((x) => [key(x), x])
      ).values()
    ]
}