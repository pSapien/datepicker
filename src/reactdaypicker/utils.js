export const splitProps = (props, specificPropNames = []) => {
  return Object.keys(props).reduce((result, propName) => {
    const isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if (isPropSpecific) {
      const commonProps = { ...result[0] };
      const specificProps = { ...result[1], [propName]: props[propName] };
      return [commonProps, specificProps];
    }

    const commonProps = { ...result[0], [propName]: props[propName] };
    const specificProps = { ...result[1] };
    return [commonProps, specificProps];
  }, [{}, {}]);
}

export const zeroTime = date => {
  if (date instanceof Date) {
    date.setHours(0, 0, 0);
  }
  return date;
}