export function convertOrderby(orderBy: string): object | object[] {
  const orderByArray = orderBy.split(',');
  const orderArray: object[] = [];

  if (orderByArray.length === 1) {
    const [key, value] = orderByArray[0].split(':');
    return { [key]: value };
  } else {
    orderByArray.forEach((element) => {
      const [key, value] = element.split(':');
      orderArray.push({ [key]: value });
    });
    return orderArray;
  }
}
