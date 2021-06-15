/**
 * Helper to dynamically sort an array of object
 * @param {string} key | object property name used to compare value
 * @param {"asc" | "desc"} order | order to return the sorted array
 * @returns 
 */
export const orderBy = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  export const messageStatus = {
    SENT: 'sent',
    RECEIVED: 'received',
    READ: 'read',
}